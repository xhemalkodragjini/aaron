"use client"

import React from 'react';
import { DocumentationStatus } from '@/app/components/QueryPanel/DocumentationStatus';
import { InstructionsPanel } from '@/app/components/QueryPanel/InstructionsPanel';
import { TranscriptInput } from '@/app/components/QueryPanel/TranscriptInput';
import { EmailOutput } from '@/app/components/QueryPanel/EmailOutput';
import { InfoFooter } from '@/app/components/QueryPanel/InfoFooter';
import { DocumentList, DocumentListSkeleton } from '@/app/components/QueryPanel/DocumentList';

export interface EmailGenerationState {
  isProcessing: boolean;
  showSuccess: boolean;
  copySuccess: boolean;
}

interface Document {
  id: string;
  url: string;
  indexedAt: string;
  status: 'indexed' | 'failed' | 'pending';
}

const QueryPanelPage = () => {
  const [transcript, setTranscript] = React.useState('');
  const [generatedEmail, setGeneratedEmail] = React.useState('');
  const [isLoadingDocs, setIsLoadingDocs] = React.useState(true);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [state, setState] = React.useState<EmailGenerationState>({
    isProcessing: false,
    showSuccess: false,
    copySuccess: false,
  });

  // Simulate loading documents
  React.useEffect(() => {
    const loadDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data - this would come from your API
        const sampleDocs: Document[] = [
          {
            id: '1',
            url: 'https://cloud.google.com/compute/docs/instances',
            indexedAt: new Date().toISOString(),
            status: 'indexed'
          },
          {
            id: '2',
            url: 'https://cloud.google.com/storage/docs/introduction',
            indexedAt: new Date().toISOString(),
            status: 'indexed'
          },
          {
            id: '3',
            url: 'https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture',
            indexedAt: new Date().toISOString(),
            status: 'pending'
          }
        ];
        
        setDocuments(sampleDocs);
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setIsLoadingDocs(false);
      }
    };

    loadDocuments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isProcessing: true }));
    
    try {
      // This will be replaced with actual API call to the RAG backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedEmail(`Dear Customer,

Thank you for our discussion today regarding your GCP infrastructure requirements.

[Generated email content will appear here]

Best regards,
Your CE`);
      
      setState(prev => ({ ...prev, showSuccess: true }));
      setTimeout(() => setState(prev => ({ ...prev, showSuccess: false })), 3000);
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(generatedEmail);
    setState(prev => ({ ...prev, copySuccess: true }));
    setTimeout(() => setState(prev => ({ ...prev, copySuccess: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header and Documentation Status */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CE Intern</h1>
          {/* <DocumentationStatus /> */}
        </div>

        {/* Instructions */}
        <InstructionsPanel />

        {/* Main Content */}
        <div className="flex gap-6 flex-col md:flex-row">
          {/* Input Section */}
          <TranscriptInput
            transcript={transcript}
            onTranscriptChange={setTranscript}
            onSubmit={handleSubmit}
            isProcessing={state.isProcessing}
          />

          {/* Output Section */}
          <EmailOutput
            generatedEmail={generatedEmail}
            onRegenerate={handleSubmit}
            onCopy={handleCopyEmail}
            showSuccess={state.showSuccess}
            copySuccess={state.copySuccess}
          />
        </div>

        {/* Document List */}
        {isLoadingDocs ? (
          <DocumentListSkeleton />
        ) : (
          <DocumentList documents={documents} />
        )}

        {/* Footer */}
        <InfoFooter />
      </div>
    </div>
  );
};

export default QueryPanelPage;