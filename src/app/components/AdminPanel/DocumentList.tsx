"use client"

import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';

interface Document {
  id: string;
  url: string;
  indexedAt: string;
  status: 'indexed' | 'failed' | 'pending';
}

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const cleanDocumentId = (id: string): string => {
  return id
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mt-8">
    <h2 className="text-xl font-semibold mb-4">Indexed Documents</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indexed At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  {cleanDocumentId(doc.id)}
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
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onDelete(doc.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Remove document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DocumentList;