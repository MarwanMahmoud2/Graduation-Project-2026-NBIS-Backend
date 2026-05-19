<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;

/**
 * Stub until FastAPI footprint AI is linked (future phase).
 */
class FootprintAiService
{
    /**
     * @return array{status: string, message: string}
     */
    public function identify(UploadedFile $image): array
    {
        return [
            'status' => 'ai_unavailable',
            'message' => 'Footprint AI identification is not available yet.',
        ];
    }
}
