# Welcome to the CE Intern: Generative AI Challenge Lab! 👩‍💻👨‍💻

Imagine you're the newest intern at **Cloud Explorers Inc.** (CE Inc.), a cutting-edge tech company specializing in all things Google Cloud Platform (GCP). Your first assignment? To revolutionize customer support using the power of Generative AI!

Your mission, should you choose to accept it (and you really should, it's going to be awesome!), is to build an intelligent assistant that helps Customer Engineers (CEs) like yourself craft perfect follow-up emails after customer calls.  No more staring at blank screens wondering how to summarize complex technical discussions!

This lab is designed to guide you through the exciting world of GCP Generative AI, Langchain, and building real-world applications.  We'll be tackling a series of challenges, each building upon the last, to transform a basic Next.js application into a powerful AI-driven tool.

## The Adventure Map (Branching Strategy) 🗺️

Think of this repository as your adventure map. We've organized it using **branches** to keep things clear and manageable as you progress through the challenges.

*   **`main` Branch (Your Starting Point):** This is where you are right now! It contains the base application – a Next.js project pre-configured with all the essential tools and a basic UI.  Consider this your clean workshop environment. You can explore the initial setup, run the app, and get familiar with the codebase.  This branch will remain untouched as you work through the challenges, ensuring you always have a pristine starting point.

*   **`challenge-1`, `challenge-2`, `challenge-3`, `challenge-4`, `challenge-5` Branches (The Challenge Zones):**  Each of these branches represents a specific challenge in your Gen AI journey.  You'll switch to these branches to work on each challenge individually.  Think of them as separate labs, each focused on a specific skill.  Each challenge branch starts from the `main` branch, so you're always building upon a solid foundation.

**To start a challenge, you'll simply switch to its corresponding branch using Git:**

```
bash
git checkout challenge-1 # For Challenge 1
git checkout challenge-2 # For Challenge 2, and so on...
```

**Don't worry about messing things up!** Because each challenge is in its own branch, you can experiment freely. If you ever want to start fresh, you can always return to the `main` branch and create a new challenge branch.

## Your Training Missions (The Challenges) 🏋️‍♀️

Here's a sneak peek at the challenges that await you:

**Challenge 1: LLM Powered Data Mining - "Web Detective" 🕵️‍♀️**

*   **Mission:**  Your first task is to become a "Web Detective"! You'll learn how to use an LLM to intelligently extract specific information from websites.  Imagine you need to quickly find the pricing details for Vertex AI.  Instead of manually sifting through pages, you'll teach the LLM to do it for you!
*   **Learnings:**
    *   **Web Scraping Basics:** Using libraries like `cheerio` (see `package.json` lines 19-20) to extract content from websites.
    *   **Structured Output:**  Guiding LLMs to return information in a structured format (like JSON) for easy use in applications.  You'll see examples of structured output parsing in `src/lib/langchain/TranscriptSummChain.tsx` from line 61.
    *   **Prompt Engineering for Extraction:** Crafting effective prompts to instruct the LLM to extract exactly what you need.  Take a look at the `extractionPrompt` in `src/app/api/content-extraction/route.ts` (lines 9-32) as a starting point.
*   **Key Technologies:** Next.js, `cheerio`, Gemini API (via `GeminiService` in `src/lib/google-ai-studio/gemini.ts`), Prompt Engineering.

**Challenge 2: Create Knowledge Base - "The Library Builder" 📚**

*   **Mission:**  Time to become "The Library Builder"! You'll build the foundation of our intelligent assistant – a knowledge base of GCP documentation.  You'll learn how to break down large documents into manageable chunks and create embeddings, turning text into numerical representations that the AI can understand semantically.
*   **Learnings:**
    *   **Chunking Strategies:**  Exploring different ways to divide text into chunks for optimal retrieval.
    *   **Embedding Creation:** Understanding how text embeddings are generated and their role in semantic search.
    *   **Embedding Storage:**  Learning about vector databases (in this case, Firestore is used for simplicity) for efficient storage and retrieval of embeddings.
*   **Key Technologies:** Next.js, Firestore, Gemini API for embeddings, Chunking algorithms (implemented in `src/app/api/indexing/processing.tsx` and `src/app/api/indexing/chunking.tsx`).

**Challenge 3: Simple RAG - "The Question Answering Machine" 🤖**

*   **Mission:**  Now you're "The Question Answering Machine" architect! You'll put your knowledge base to work by building a simple Retrieval-Augmented Generation (RAG) system.  Users will ask questions about GCP, and your application will search the knowledge base and generate answers based on relevant documentation snippets.
*   **Learnings:**
    *   **Simple RAG Pipeline:**  Understanding the core components of RAG: Retrieval (searching the knowledge base) and Generation (using an LLM to create answers).
    *   **Semantic Search:**  Using vector search to find relevant documents based on meaning, not just keywords.  The `VectorSearchUtil` (referenced in `src/lib/langchain/TranscriptSummChain.tsx` line 4) is your search engine.
    *   **Prompt Engineering for Summarization:**  Crafting prompts to guide the LLM to generate concise and accurate summaries from retrieved documents.  Check out the `summaryPrompt` in `src/app/api/generate-summary/route.tsx` (lines 7-23).
*   **Key Technologies:** Next.js, Firestore, Gemini API, Langchain, Vector Search, Prompt Engineering.

**Challenge 4: Advanced RAG - "The Email Alchemist" 📧**

*   **Mission:**  Become "The Email Alchemist"! This is where it all comes together. You'll build the full email generation pipeline, taking a customer call transcript as input, identifying technical questions, researching answers from the knowledge base, and finally, generating a professional follow-up email.
*   **Learnings:**
    *   **Prompt Chaining with Langchain:**  Using Langchain's `RunnableSequence` (see `src/lib/langchain/TranscriptSummChain.tsx` line 1) to create complex, multi-step workflows.
    *   **Advanced RAG Techniques:**  Building a more sophisticated RAG system that involves task extraction, research, and email generation.
    *   **Prompt Engineering for Email Generation:**  Designing prompts to create emails that are not only informative but also professional and customer-friendly.  The `emailGeneration` prompt in `src/lib/langchain/config.tsx` (lines 1033-1055) is your canvas.
*   **Key Technologies:** Next.js, Firestore, Gemini API, Langchain, Vector Search, Prompt Chaining, Advanced Prompt Engineering.

**Challenge 5: Tracing & Tracking - "The Observability Guru" 🔭**

*   **Mission:**  Step into the shoes of "The Observability Guru"!  You'll learn how to monitor and track your Gen AI application using Langfuse.  This is crucial for understanding performance, debugging issues, and continuously improving your AI assistant.
*   **Learnings:**
    *   **Tracing and Tracking:**  Understanding the importance of observability in LLM applications.
    *   **Langfuse Integration:**  Using Langfuse (see `langfuse-langchain` dependency in `package.json` line 25 and its usage in `src/lib/langchain/TranscriptSummChain.tsx` from line 9) to trace requests, monitor performance, and analyze results.
    *   **Quality Control & Experimentation:**  Using tracing data to identify areas for improvement and to evaluate the impact of changes (like prompt modifications).
*   **Key Technologies:** Next.js, Langfuse, Langchain, Observability principles.

## Get Ready to Explore! 🚀

Each challenge will have its own detailed `README.md` file within its branch, providing specific instructions and hints.

So, are you ready to become a CE Intern and master the power of Generative AI on GCP? Let's get started!  Head over to `challenge-1` branch to begin your adventure! Good luck, and have fun! 🎉