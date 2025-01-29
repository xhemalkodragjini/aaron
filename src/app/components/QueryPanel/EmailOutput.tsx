"use client"

import React from 'react';
import { Copy, RefreshCw, CheckCircle2 } from 'lucide-react';

interface EmailOutputProps {
  generatedEmail: string;
  onRegenerate: (e: React.FormEvent) => void;
  onCopy: () => void;
  showSuccess: boolean;
  copySuccess: boolean;
  error: string | null; 
}

export const EmailOutput: React.FC<EmailOutputProps> = ({
  generatedEmail,
  onRegenerate,
  onCopy,
  showSuccess,
  copySuccess
}) => {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">Generated Email</h2>
          {generatedEmail && (
            <div className="flex gap-2">
              <button
                onClick={onRegenerate}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                title="Generate a new version with the same transcript"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
              <button
                onClick={onCopy}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <Copy className="w-4 h-4" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          The generated email will include technical answers and relevant documentation links. Review and adjust as needed.
        </p>

        {showSuccess && (
          <div className="mb-4 bg-green-50 text-green-800 rounded-lg p-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p>Email generated successfully! Review the content and documentation links before sending.</p>
          </div>
        )}

        <div className="border border-gray-200 rounded-lg p-4 h-96 overflow-y-auto whitespace-pre-wrap font-mono text-sm bg-gray-50">
          {generatedEmail || 'Your generated email will appear here, including:\n- Technical answers to customer questions\n- Links to relevant GCP documentation\n- Professional formatting and structure'}
        </div>
      </div>
    </div>
  );
};