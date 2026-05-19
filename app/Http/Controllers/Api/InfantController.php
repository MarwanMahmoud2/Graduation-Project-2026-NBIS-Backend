<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Infant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class InfantController extends Controller
{
    /**
     * وظيفة تسجيل طفل جديد برفع صورة البصمة وكود الـ NFC
     */
    
    public function search(Request $request)
    {
        // 1. التأكد من وجود الصورة
        $request->validate([
            'fingerprint_image' => 'required|image',
        ]);

        $image = $request->file('fingerprint_image');

        try {
            // 2. إرسال طلب لـ FastAPI - لاحظ تغيير الرابط ليكون /identify
            $response = Http::attach(
                'file',
                file_get_contents($image),
                $image->getClientOriginalName()
            )->post('http://127.0.0.1:8000/identify'); // الرابط الصحيح هو identify

            if ($response->successful()) {
                $result = $response->json(); // النتيجة JSON من الـ AI

                // 3. التحقق من حالة المطابقة (MATCH)
                if ($result['status'] === 'MATCH') {

                    // الـ AI بيرجع البيانات كاملة من الـ SQLite داخل بلوك 'database'
                    return response()->json([
                        'status' => 'match_found',
                        'confidence_tier' => $result['confidence_tier'], // HIGH, MEDIUM, LOW
                        'score' => $result['confidence'], // نسبة التشابه الفعلية
                        'data' => [
                            'child' => $result['database']['child'], // بيانات الطفل
                            'parents' => [
                                'father' => $result['database']['father'], // بيانات الأب
                                'mother' => $result['database']['mother']  // بيانات الأم
                            ],
                            'hospital' => $result['database']['hospital'] // بيانات المستشفى
                        ]
                    ]);
                }
            }

            // 4. في حالة عدم وجود تطابق
            return response()->json([
                'status' => 'no_match',
                'message' => 'لم يتم العثور على سجلات مطابقة لهذه البصمة.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'سيرفر الـ AI غير متصل حالياً'], 500);
        }
    }

    public function store(Request $request)
    {
        // 1. التحقق من البيانات (خلينا الـ image إجباري هنا لضمان وجود مسار)
        $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'birth_date' => 'nullable|date',
            'nfc_tag_id' => 'required|string|unique:infants,nfc_tag_id',
            'fingerprint_image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        // 2. معالجة رفع الصورة (تعريف المتغير بقيمة افتراضية أو التأكد من وجوده)
        $imagePath = null; // تعريف مبدئي لتجنب خطأ الـ undefined

        if ($request->hasFile('fingerprint_image')) {
            $imagePath = $request->file('fingerprint_image')->store('fingerprints', 'public');
        }

        // 3. حفظ البيانات
        $infant = Infant::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'nfc_tag_id' => $request->nfc_tag_id,
            'fingerprint_image' => $imagePath, // دلوقتي المتغير مضمون الوجود
            'status' => 'safe',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Infant registered successfully',
            'data' => $infant
        ], 201);
    }
}