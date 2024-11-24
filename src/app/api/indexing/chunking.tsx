// src/app/api/indexing/chunking.ts

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


export interface ChunkingConfig {
  maxChunkSize: number;
  overlapSize: number;
  minChunkSize?: number;
}

const DEFAULT_CONFIG: ChunkingConfig = {
  maxChunkSize: 300,
  overlapSize: 10,
  minChunkSize: 100
};


export class DocumentChunker {
  // private config: ChunkingConfig = DEFAULT_CONFIG,
  private splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 30,
  });

  async chunkText(text: string): Promise<string[]> {
    
    if (!text || typeof text !== 'string') {
      return [];
    }

    const outputDocuments = await this.splitter.createDocuments([text]);
    return outputDocuments.map(d => d.pageContent);
  }

}


// export function chunkSection(
//   text: string,
//   config: ChunkingConfig = DEFAULT_CONFIG
// ): string[] {
//   const { maxChunkSize, overlapSize, minChunkSize = 100 } = config;

//   // If text is smaller than minChunkSize, return as single chunk
//   if (text.length <= minChunkSize) {
//     return [text];
//   }

//   const words = text.split(/\s+/);
//   const chunks: string[] = [];
//   let currentChunk: string[] = [];
//   let currentLength = 0;

//   for (const word of words) {
//     currentChunk.push(word);
//     currentLength += word.length + 1; // +1 for space

//     if (currentLength >= maxChunkSize) {
//       chunks.push(currentChunk.join(' '));

//       // Keep last few words for overlap
//       const overlapWords = currentChunk.slice(-Math.ceil(overlapSize / 5)); // approximate words for overlap
//       currentChunk = [...overlapWords];
//       currentLength = overlapWords.join(' ').length;
//     }
//   }

//   // Add remaining words if any
//   if (currentChunk.length > 0) {
//     const lastChunk = currentChunk.join(' ');
//     // Only add as separate chunk if it's long enough
//     if (lastChunk.length >= minChunkSize || chunks.length === 0) {
//       chunks.push(lastChunk);
//     } else {
//       // Append to previous chunk if too short
//       const previousChunk = chunks.pop();
//       if (previousChunk) {
//         chunks.push(`${previousChunk} ${lastChunk}`);
//       } else {
//         chunks.push(lastChunk);
//       }
//     }
//   }

//   return chunks;
// }