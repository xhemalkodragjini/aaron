"use client"

import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface DocumentationStatusProps {
  documentationUrl?: string;
}

export const DocumentationStatus: React.FC<DocumentationStatusProps> = ({
  documentationUrl = "https://docs.google.com/spreadsheets/d/your-sheet-id"
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <BookOpen className="w-4 h-4" />
        <span>Documentation Index Status:</span>
        <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
          Active and Up-to-date
        </span>
      </div>
    </div>
  );
};

export const DocumentationStatusSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
      <div className="h-4 w-40 bg-gray-200 rounded" />
    </div>
  );
};

export const DocumentationStatusError = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <BookOpen className="w-4 h-4" />
        <span>Documentation Index Status:</span>
        <span className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
          Error Loading Status
        </span>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
      >
        Retry Loading Status
        <ExternalLink className="w-3 h-3" />
      </button>
    </div>
  );
};