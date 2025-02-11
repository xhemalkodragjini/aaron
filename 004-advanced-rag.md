# Challenge 4: Advanced RAG - "The Email Alchemist" 📧

> ⚠️ **Note:** This challenge is currently under development. While you can review the codebase and understand the concepts, the full implementation is not yet available. Stay tuned for updates!

## Introduction

Welcome to the most complex challenge yet! As "The Email Alchemist", you'll transform a simple RAG system into a sophisticated multi-step pipeline using LangChain. Your mission is to build an AI assistant that can:

1. Extract technical questions from customer call transcripts
2. Research answers using your knowledge base
3. Generate professional follow-up emails

## Understanding the Codebase

Let's explore the key components that will power this advanced RAG system:

### 1. Query UI (`src/app/query/page.tsx`)
- The email query interface to submit a customer transcript
- Based on the transcript we technical topics that have been asked
- Based on the technical questions we research the anwers that are referenced in our knowledge base.

### 2. LangChain Configuration (`src/lib/langchain/config.tsx`)
- Defines prompt templates for each step in the pipeline
- Configures output parsers for structured responses
- Key sections:
  - Email generation prompt template (lines 1033-1055)
  - Output parser configurations (lines 1058-1073)

### 3. Transcript Summary Chain (`src/lib/langchain/TranscriptSummChain.tsx`)
- Implements the core RAG pipeline using LangChain's `RunnableSequence`
- Handles:
  - Task extraction from transcripts
  - Vector search integration
  - Research compilation
  - Email generation
- Notable components:
  - Chain initialization and types (lines 1-33)
  - Vector search integration (lines 94-113)
  - Research chain setup (lines 119-129)

## Key Concepts

1. **Prompt Chaining**
   - Breaking complex tasks into smaller, focused steps
   - Using LangChain's `RunnableSequence` for orchestration
   - Maintaining context between steps

2. **Structured Output**
   - Using output parsers to ensure consistent response formats
   - Handling complex data structures like tasks and research results
   - Maintaining traceability of sources

3. **Advanced RAG Techniques**
   - Multi-step retrieval process
   - Context-aware prompt engineering
   - Source attribution and citation

## Resources
- [LangChain Documentation](https://js.langchain.com/docs/how_to/sequence/#the-pipe-method)
