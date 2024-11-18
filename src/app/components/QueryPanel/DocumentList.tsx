"use client"

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Document {
  id: string;
  url: string;
  indexedAt: string;
  status: 'indexed' | 'failed' | 'pending';
}

interface DocumentListProps {
  documents: Document[];
}

const cleanDocumentId = (id: string): string => {
  return id
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Available Documentation</h2>
      <span className="text-sm text-gray-500">
        {documents.length} documents indexed
      </span>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Indexed At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <a 
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  {cleanDocumentId(doc.url)}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(doc.indexedAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${doc.status === 'indexed' ? 'bg-green-100 text-green-800' :
                    doc.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {doc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {documents.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        No documents have been indexed yet.
      </div>
    )}
  </div>
);

// Optional loading state component
export const DocumentListSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    <div className="flex items-center justify-between mb-4">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
      ))}
    </div>
  </div>
);

// Optional error state component
export const DocumentListError: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    <div className="text-center py-8">
      <p className="text-red-600 mb-2">Unable to load documentation list</p>
      <button 
        onClick={() => window.location.reload()}
        className="text-blue-600 hover:text-blue-800"
      >
        Retry
      </button>
    </div>
  </div>
);