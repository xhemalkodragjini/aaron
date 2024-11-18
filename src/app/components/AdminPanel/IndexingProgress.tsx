"use client"

import React from 'react';

interface IndexingProgressProps {
  progress: number;
  isVisible: boolean;
}

const IndexingProgress: React.FC<IndexingProgressProps> = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Indexing Progress</span>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default IndexingProgress;