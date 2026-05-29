<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

/**
 * Stub until FastAPI footprint validation is linked (future phase).
 */
class FootprintValidationService
{
    /**
     * @return array{reason: string, message: string}
     */
    public function validate(UploadedFile $image, ?int $childId = null): array
    {
        return [
            'reason' => 'ai_unavailable',
            'message' => 'Footprint AI validation is not available yet.',
        ];
    }
}
