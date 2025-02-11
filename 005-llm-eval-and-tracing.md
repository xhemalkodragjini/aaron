# Challenge 5: LLM Evaluation & Tracing - "The Quality Guardian" 🔍

> ⚠️ **Note:** This challenge is currently under development. While you can configure tracing and explore the Langfuse interface, the full implementation details will be coming soon. Stay tuned for updates!

## Introduction

As your RAG system grows more complex, understanding what's happening under the hood becomes crucial. In this challenge, you'll implement LLM observability and evaluation using [Langfuse](https://langfuse.com/docs/get-started), an open-source LLM engineering platform.

## Getting Started with Tracing 🚀

### 1. Configure Langfuse

First, set up your Langfuse environment variables in `.env.local`:

You can get your API keys by:
1. Creating a Langfuse account
2. Creating a new project
3. Generating API credentials in the project settings

### 2. Understanding the Tracing Setup

Your RAG application is already configured to send traces to Langfuse.
Langfuse is for example implemented in `src/lib/langchain/TranscriptSummaryChain.ts`.

Key components include:

1. **Vector Search Tracing**
   - Query embedding generation
   - Similarity search execution
   - Result scoring and filtering

2. **Summary Generation Tracing**
   - Context preparation
   - Prompt construction
   - LLM response generation

3. **Overall Request Flow**
   - User input processing
   - Search and retrieval steps
   - Response generation and formatting


## Current Functionality

While the full challenge is being developed, you can:

1. **View Traces in Langfuse**
   - Explore the RAG pipeline execution
   - Monitor LLM calls
   - Track vector search operations

2. **Monitor Basic Metrics**
   - Response times
   - Token usage
   - Success/failure rates

## Resources

- [Langfuse Documentation](https://langfuse.com/docs/get-started)
- [LLM Observability Best Practices](https://langfuse.com/blog)