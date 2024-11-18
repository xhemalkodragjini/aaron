"use client"

import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface TranscriptInputProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

export const TranscriptInput: React.FC<TranscriptInputProps> = ({
  transcript,
  onTranscriptChange,
  onSubmit,
  isProcessing
}) => {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Call Transcript Input</h2>
        <p className="text-gray-600 mb-4">
          Paste the transcript from your customer call. Include as much context as possible for better results.
        </p>
        
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <textarea
              value={transcript}
              onChange={(e) => onTranscriptChange(e.target.value)}
              placeholder="Example:
Customer: How do we implement automated backup for Cloud SQL instances?
CE: Let me look into the best practices for that...
Customer: Also, what's the recommended way to handle failover?
..."
              className="w-full h-96 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isProcessing || !transcript}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Transcript & Generating Email...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Generate Follow-up Email
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onTranscriptChange('')}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};