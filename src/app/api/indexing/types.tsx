// types.ts
export interface DocumentMetadata {
    id: string;
    url: string;
    indexedAt: string | null;
    status: 'pending' | 'indexed' | 'failed';
    error?: string;
  }
  
  export interface DocumentChunk {
    id: string;
    documentId: string;
    content: string;
    embedding: number[];
    startIndex: number;
    endIndex: number;
  }