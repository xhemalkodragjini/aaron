"use client"

import React, { useState } from 'react';
import StatusOverview from '@/app/components/AdminPanel/StatusOverview';
import IndexingProgress from '@/app/components/AdminPanel/IndexingProgress';
import URLManager from '@/app/components/AdminPanel/URLManager';
import DocumentList from '@/app/components/AdminPanel/DocumentList';

// Types
interface Document {
  id: string;
  url: string;
  indexedAt: string;
  status: 'indexed' | 'failed' | 'pending';
}

const AdminPanel = () => {
  // State
  const [urls, setUrls] = useState('');
  const [isIndexing, setIsIndexing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [lastIndexed, setLastIndexed] = useState('Never');
  const [indexingStatus, setIndexingStatus] = useState<'idle' | 'running' | 'error' | 'success'>('idle');
  const [indexedDocsCount, setIndexedDocsCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);

  // Handlers
  const startIndexing = async () => {
    setIsIndexing(true);
    setIndexingStatus('running');
    setStatusMessage('Starting indexing process...');
    setIndexingProgress(0);

    try {
      const pendingDocs = documents.filter(doc => doc.status === 'pending');
      const totalDocs = pendingDocs.length;
      
      for (let i = 0; i < totalDocs; i++) {
        const progress = Math.round((i / totalDocs) * 100);
        setIndexingProgress(progress);
        setStatusMessage(`Processing document ${i + 1} of ${totalDocs}...`);
        
        const response = await fetch(`/api/indexing/${pendingDocs[i].id}/reindex`, {
          method: 'POST'
        });

        if (!response.ok) {
          throw new Error('Failed to reindex document');
        }
      }

      setIndexingStatus('success');
      setStatusMessage('Indexing completed successfully');
      setLastIndexed(new Date().toLocaleString());
      await refreshDocuments();
      
    } catch (error) {
      setIndexingStatus('error');
      setStatusMessage('Error during indexing: ' + (error as Error).message);
    } finally {
      setIsIndexing(false);
    }
  };

  const handleAddUrls = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsSubmitting(true);
    
    try {
      const urlList = urls.split('\n')
        .map(url => url.trim())
        .filter(url => url);
      
      if (!urlList.every(url => url.startsWith('https://cloud.google.com/'))) {
        throw new Error('All URLs must be Google Cloud documentation URLs starting with "https://cloud.google.com"');
      }

      console.log('sending to /indexing: ' + JSON.stringify({ urls: urlList }))
      
      const response = await fetch('/api/indexing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlList }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add URLs');
      }
      
      const result = await response.json();
      setDocuments(prev => [...prev, ...result.documents]);
      setStatusMessage(`Successfully added ${urlList.length} URLs`);
      setIndexingStatus('success');
      setUrls('');
      
    } catch (error) {
      setError((error as Error).message);
      setIndexingStatus('error');
      setStatusMessage('Error adding URLs: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/indexing/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
      
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      setIndexedDocsCount(prev => prev - 1);
      setStatusMessage('Document removed successfully');
      setIndexingStatus('success');
    } catch (error) {
      setStatusMessage('Error removing document: ' + (error as Error).message);
      setIndexingStatus('error');
    }
  };

  const refreshDocuments = async () => {
    try {
      const response = await fetch('/api/indexing');
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      
      const data = await response.json();
      setDocuments(data.documents);
      setIndexedDocsCount(data.documents.filter(doc => doc.status === 'indexed').length);
    } catch (error) {
      console.error('Error refreshing documents:', error);
    }
  };

  // Initial load
  React.useEffect(() => {
    refreshDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">CE Intern Admin Panel</h1>

        <StatusOverview
          indexedDocsCount={indexedDocsCount}
          lastIndexed={lastIndexed}
          indexingStatus={indexingStatus}
          statusMessage={statusMessage}
          isIndexing={isIndexing}
          onStartIndexing={startIndexing}
        />

        <IndexingProgress
          progress={indexingProgress}
          isVisible={isIndexing}
        />

        <URLManager
          urls={urls}
          onUrlsChange={setUrls}
          onSubmit={handleAddUrls}
          onClear={() => setUrls('')}
          error={error}
          isSubmitting={isSubmitting}
        />

        <DocumentList
          documents={documents}
          onDelete={handleDeleteDocument}
        />
      </div>
    </div>
  );
};

export default AdminPanel;