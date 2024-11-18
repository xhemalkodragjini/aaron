"use client"

import React from 'react';
import { Info } from 'lucide-react';

export const InstructionsPanel: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h2 className="font-semibold text-blue-900 mb-2">How CE Intern works:</h2>
          <ol className="list-decimal list-inside space-y-1 text-blue-800">
            <li>Paste your call transcript in the left panel</li>
            <li>Our AI will automatically identify technical questions from the conversation</li>
            <li>Responses are generated using the latest GCP documentation</li>
            <li>Review and customize the generated email before sending</li>
          </ol>
        </div>
      </div>
    </div>
  );
};