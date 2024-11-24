// src/hooks/useTranscriptProcessor.ts
import { useState } from "react";

interface Task {
  description: string;
  context: string;
}

interface ResearchResult {
  answer: string;
  steps: string[];
  caveats: string[];
  docReferences: Array<{ title: string; url: string }>;
}

interface ProcessingResult {
  tasks: Task[];
  research: ResearchResult[];
  email: string;
}

export function useTranscriptProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processTranscript = async (transcript: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/process-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to process transcript");
      }

      const data = await response.json();
      setResult(data.data);
      return data.data;

    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      throw err;

    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    processTranscript,
    isProcessing,
    result,
    error,
    reset,
  };
}