<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\Child;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    private const ALLOWED_ROLES = ['user', 'nurse', 'police', 'admin'];

    /**
     * تطبيق ولي الأمر: إنشاء حساب جديد .
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => $validated['password'],
            'national_id' => $validated['national_id'] ?? null,
            'role' => 'user',
        ]);

        $this->linkExistingChildrenToParent($user);

        $token = $user->createToken('mobile')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully.',
            'user' => $this->userPayload($user),
            'token' => $token,
        ], 201);
    }

    /** تسجيل دخول — جميع الأدوار (React / mobile) */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        if (! in_array($user->role, self::ALLOWED_ROLES, true)) {
            return response()->json([
                'message' => 'This account role is not allowed to sign in.',
            ], 403);
        }

        if ($user->role === 'user') {
            $this->linkExistingChildrenToParent($user);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully.',
            'user' => $this->userPayload($user),
            'token' => $token,
        ]);
    }

    /** المستخدم الحالي (نفس شكل register/login) */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $this->userPayload($request->user()),
        ]);
    }

    /** تسجيل خروج وحذف التوكن */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'national_id' => $user->national_id,
        ];
    }

    /**
     * ربط سجلات المستشفى (سجلتها الممرضة) بولي الأمر لو الرقم القومي متطابق.
     */
    private function linkExistingChildrenToParent(User $user): void
    {
        if (! $user->national_id) {
            return;
        }

        Child::query()
            ->where('father_national_id', $user->national_id)
            ->whereNull('user_id')
            ->update(['user_id' => $user->id]);
    }
}
