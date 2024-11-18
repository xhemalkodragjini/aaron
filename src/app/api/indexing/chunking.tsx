// src/app/api/indexing/chunking.ts

export interface ChunkingConfig {
  maxChunkSize: number;
  overlapSize: number;
  minChunkSize?: number;
}

const DEFAULT_CONFIG: ChunkingConfig = {
  maxChunkSize: 500,
  overlapSize: 50,
  minChunkSize: 100
};

export function chunkSection(
  text: string, 
  config: ChunkingConfig = DEFAULT_CONFIG
): string[] {
  const { maxChunkSize, overlapSize, minChunkSize = 100 } = config;
  
  // If text is smaller than minChunkSize, return as single chunk
  if (text.length <= minChunkSize) {
    return [text];
  }

  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    currentChunk.push(word);
    currentLength += word.length + 1; // +1 for space

    if (currentLength >= maxChunkSize) {
      chunks.push(currentChunk.join(' '));
      
      // Keep last few words for overlap
      const overlapWords = currentChunk.slice(-Math.ceil(overlapSize / 5)); // approximate words for overlap
      currentChunk = [...overlapWords];
      currentLength = overlapWords.join(' ').length;
    }
  }

  // Add remaining words if any
  if (currentChunk.length > 0) {
    const lastChunk = currentChunk.join(' ');
    // Only add as separate chunk if it's long enough
    if (lastChunk.length >= minChunkSize || chunks.length === 0) {
      chunks.push(lastChunk);
    } else {
      // Append to previous chunk if too short
      const previousChunk = chunks.pop();
      if (previousChunk) {
        chunks.push(`${previousChunk} ${lastChunk}`);
      } else {
        chunks.push(lastChunk);
      }
    }
  }

  return chunks;
}

export function optimizeChunksForEmbedding(chunks: string[]): string[] {
  return chunks.map(chunk => {
    // Remove excessive whitespace
    let optimized = chunk.replace(/\s+/g, ' ').trim();
    
    // Remove incomplete sentences at the start if they don't begin with capital letter
    if (!/^[A-Z]/.test(optimized)) {
      const firstSentence = optimized.match(/^[^.!?]*[.!?]/);
      if (firstSentence) {
        optimized = optimized.slice(firstSentence[0].length).trim();
      }
    }
    
    // Remove incomplete sentences at the end
    const lastPeriod = optimized.match(/[.!?][^.!?]*$/);
    if (lastPeriod) {
      optimized = optimized.slice(0, lastPeriod.index + 1);
    }
    
    return optimized;
  }).filter(chunk => chunk.length > 0); // Remove empty chunks
}