"use client"

import React from 'react';
import { Info } from 'lucide-react';

export const InstructionsPanel: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h2 className="font-semibold text-blue-900 mb-2">This is what I can do:</h2>
          <ol className="list-decimal list-inside space-y-1 text-blue-800">
            <li>Show me your customer call transcript in the left panel.</li>
            <li>I will identify technical questions from the conversation.</li>
            <li>I will help you anwswer these questions based on the indexed GCP documentation.</li>
            <li>will write up a tal follow up email for customers. Please read and review before sending it out!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};