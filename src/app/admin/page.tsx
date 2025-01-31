"use client"

import React, { useState } from 'react';
import StatusOverview from '@/app/components/AdminPanel/StatusOverview';
import IndexingProgress from '@/app/components/AdminPanel/IndexingProgress';
import URLManager from '@/app/components/AdminPanel/URLManager';
import DocumentList from '@/app/components/AdminPanel/DocumentList';
import ExtractedContentResults from '@/app/components/AdminPanel/ExtractedContentResults';

// Types
interface Document {
  id: string;
  url: string;
  indexedAt: string;
  status: 'indexed' | 'failed' | 'pending';
}

interface ExtractedContent {
  url: string;
  status: 'success' | 'error';
  data?: string;
  error?: string;
}

const AdminPanel = () => {
  // State
  const [urls, setUrls] = useState('');
  const [entityDescription, setEntityDescription] = useState('');
  const [isIndexing, setIsIndexing] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [lastIndexed, setLastIndexed] = useState('Never');
  const [indexingStatus, setIndexingStatus] = useState<'idle' | 'running' | 'error' | 'success'>('idle');
  const [indexedDocsCount, setIndexedDocsCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [extractedContents, setExtractedContents] = useState<ExtractedContent[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtractContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsExtracting(true);

    try {
      const urlList = urls.split('\n')
        .map(url => url.trim())
        .filter(url => url);

      console.log('sending to /api/content-extraction: ' + JSON.stringify({ urls: urlList }))

      const response = await fetch('/api/content-extraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlList, entityDescription }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to extract content');
      }

      const result = await response.json();
      setExtractedContents(result.results);
      setStatusMessage(`Successfully processed ${urlList.length} URLs`);
      setIndexingStatus('success');

    } catch (error) {
      setError((error as Error).message);
      setIndexingStatus('error');
      setStatusMessage('Error processing URLs: ' + (error as Error).message);
    } finally {
      setIsExtracting(false);
    }
  };

  // Add handleIndex function
  const handleIndex = async (content: ExtractedContent) => {
    if (!content.data || !content.url) return;

    setIsIndexing(prev => ({ ...prev, [content.url]: true }));
    setError(undefined);

    try {
      const response = await fetch('/api/indexing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: [content.url],
          extractedContent: content.data
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to index content');
      }

      const result = await response.json();
      setDocuments(prev => [...prev, ...result.documents]);
      setStatusMessage(`Successfully started indexing for ${content.url}`);
      setIndexingStatus('success');

    } catch (error) {
      setError((error as Error).message);
      setIndexingStatus('error');
      setStatusMessage('Error indexing content: ' + (error as Error).message);
    } finally {
      setIsIndexing(prev => ({ ...prev, [content.url]: false }));
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
      setIndexedDocsCount(data.documents.filter((doc: Document) => doc.status === 'indexed').length);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Knowledge Scraper Panel</h1>

        {/* <StatusOverview
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
        /> */}

        <URLManager
          urls={urls}
          entityDescription={entityDescription}
          onUrlsChange={setUrls}
          onEntityDescriptionChange={setEntityDescription}
          onSubmit={handleExtractContent}
          onClear={() => setUrls('')}
          error={error}
          isSubmitting={isExtracting}
        />

        <ExtractedContentResults
          contents={extractedContents}
          isLoading={isExtracting}
          onIndex={handleIndex}
          isIndexing={isIndexing}
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