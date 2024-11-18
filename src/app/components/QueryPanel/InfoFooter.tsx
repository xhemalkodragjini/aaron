"use client"

import React from 'react';

export const InfoFooter: React.FC = () => {
  return (
    <div className="mt-6 text-sm text-gray-500">
      <p>
        CE Intern uses a RAG (Retrieval-Augmented Generation) system to ensure accurate technical information. 
        All responses are based on official GCP documentation.
      </p>
    </div>
  );
};