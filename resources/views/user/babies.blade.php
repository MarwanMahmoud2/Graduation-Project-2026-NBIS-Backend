<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('My Children') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if (session('success'))
                <div class="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-800">{{ session('success') }}</div>
            @endif
            @if (session('warning'))
                <div class="mb-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">{{ session('warning') }}</div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h1 class="text-xl font-bold mb-4">{{ __('My Children') }}</h1>

                @if ($children->isEmpty())
                    <p class="text-gray-600">{{ __('No children linked to your account yet. Register with your national ID matching hospital records, or wait until the nurse registers your baby.') }}</p>
                @else
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 text-sm">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-2 text-left">{{ __('Name') }}</th>
                                    <th class="px-4 py-2 text-left">{{ __('Mother') }}</th>
                                    <th class="px-4 py-2 text-left">{{ __('Status') }}</th>
                                    <th class="px-4 py-2 text-left">{{ __('Actions') }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                @foreach ($children as $baby)
                                    <tr>
                                        <td class="px-4 py-2 font-medium">{{ $baby->baby_name }}</td>
                                        <td class="px-4 py-2">{{ $baby->mother_name }}</td>
                                        <td class="px-4 py-2">
                                            <span class="rounded px-2 py-1 text-xs font-semibold
                                                @if ($baby->status === 'missing') bg-red-100 text-red-800
                                                @elseif ($baby->status === 'safe') bg-green-100 text-green-800
                                                @else bg-gray-100 text-gray-800 @endif">
                                                {{ $baby->status }}
                                            </span>
                                        </td>
                                        <td class="px-4 py-2">
                                            @if ($baby->status !== 'missing')
                                                <form method="POST" action="{{ route('user.reportMissing') }}" class="inline-flex flex-col gap-1 sm:flex-row sm:items-end">
                                                    @csrf
                                                    <input type="hidden" name="baby_id" value="{{ $baby->id }}">
                                                    <input type="text" name="notes" placeholder="{{ __('Notes (optional)') }}" class="rounded border-gray-300 text-xs sm:w-48">
                                                    <button type="submit" class="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700">
                                                        {{ __('Report missing') }}
                                                    </button>
                                                </form>
                                            @else
                                                <span class="text-gray-400 text-xs">—</span>
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
