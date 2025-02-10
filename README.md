# Welcome to the CE Intern: Generative AI Challenge Lab! 👩‍💻👨‍💻

Imagine you're the newest intern at **Cloud Explorers Inc.** (CE Inc.), a cutting-edge tech company specializing in all things Google Cloud Platform (GCP). Your first assignment? To revolutionize customer support using the power of Generative AI!

Your mission, should you choose to accept it (and you really should, it's going to be awesome!), is to build an intelligent assistant that helps Customer Engineers (CEs) like yourself craft perfect follow-up emails after customer calls.  No more staring at blank screens wondering how to summarize complex technical discussions!

This lab is designed to guide you through the exciting world of GCP Generative AI, Langchain, and building real-world applications.  We'll be tackling a series of challenges, each building upon the last, to transform a basic Next.js application into a powerful AI-driven tool.

## Getting Started with GCP 🚀

Before you embark on your Gen AI adventure, you'll need to set up your Google Cloud Platform (GCP) environment. Don't worry, it's easier than launching a rocket! Just follow these steps:

**1. Create or Select a GCP Project:**

*   If you don't already have a GCP project, go to the [GCP Console](https://console.cloud.google.com/) and create a new project. Give it a cool name like "ce-intern-gen-ai-lab" or whatever you prefer!
*   If you have an existing project, make sure you have the necessary permissions (Project Editor or Owner role is recommended).
*   **Note your Project ID:** You'll need this Project ID throughout the lab. It looks something like `knowledge-navigator-449510`.

**2. Enable Required APIs:**

*   In the GCP Console, navigate to "APIs & Services" > "Enabled APIs & services".
*   Click "+ Enable APIs AND SERVICES".
*   Enable the following APIs. You can search for them by name:
    *   **Artifact Registry API**
    *   **Cloud Run API**
    *   **Cloud Firestore API**
    *   **Vertex AI API**
    *   **Cloud Build API**

**3. Install the Google Cloud CLI (gcloud CLI):**

*   If you don't have it already, install the gcloud CLI. Follow the instructions for your operating system here: [https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)
*   Once installed, initialize the gcloud CLI by running:
    ```bash
    gcloud init
    ```
    *   Follow the prompts to log in with your Google account and select the GCP project you created or selected in step 1.

**4. Set up Application Default Credentials (ADC) for Local Development:**

*   For local development, the easiest way to authenticate is using Application Default Credentials (ADC). Run this command in your terminal:
    ```bash
    gcloud auth application-default login
    ```
    *   This will open a browser window asking you to log in with your Google account.  Make sure to use the same account associated with your GCP project.
    *   This command creates local credentials that the application can use to authenticate with GCP services when you run it locally.

**5. Configure Project ID in your local environment:**

*   You need to tell the application which GCP project to use.  The easiest way is to set an environment variable.
*   In your terminal, before running the application, set your GCP Project ID as an environment variable:
    ```bash
    export GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_ID>
    ```
    *   Replace `<YOUR_PROJECT_ID>` with your actual GCP Project ID.
    *   Alternatively, you can create a `.env.local` file in the root of your project and add the line:
        ```
        GOOGLE_CLOUD_PROJECT=<YOUR_PROJECT_ID>
        ```
        Next.js automatically loads variables from `.env.local`.

**Congratulations!** You've completed the basic GCP setup. You are now ready to explore the application and start the challenges!

## Application Architecture 🏗️

efore you dive into the challenges, let's take a bird's-eye view of the application's architecture. This will help you understand how the different components interact.

The application follows a typical web application structure with a Next.js frontend and backend, leveraging Google Cloud services for Generative AI and data storage.

*   **Frontend (Next.js Frontend):**  This is the user interface you interact with in your browser. Built with React and Next.js, it handles:
    *   Presenting the **Transcript Input** area (`src/app/components/QueryPanel/TranscriptInput.tsx`) where you paste customer call transcripts.
    *   Displaying **Instructions** and information (`src/app/components/QueryPanel/InstructionsPanel.tsx`).
    *   Showing the **generated Email Output** (`src/app/components/QueryPanel/EmailOutput.tsx`).
    *   Rendering **Research Topics and Findings** (`src/app/components/QueryPanel/ResearchTopicResults.tsx`).
    *   Listing **Indexed Documents** (`src/app/components/QueryPanel/DocumentList.tsx`).
    *   Navigation and overall user experience (`src/app/page.tsx`, `src/app/query/page.tsx`).

*   **Backend API (Next.js API Routes):**  These are the server-side functions that power the application, handling requests from the frontend and orchestrating the AI processes. Key API routes include:
    *   `/api/transcript-processing` (Conceptual):  This endpoint (not explicitly created as a separate route in the provided code, but implied within the `query/page.tsx` logic and using `processTranscript` from `src/lib/langchain/TranscriptSummChain.tsx`) receives the transcript from the frontend and triggers the Langchain processing chains.
    *   `/api/content-extraction` (`src/app/api/content-extraction/route.ts`):  Used in Challenge 1 for extracting content from web pages based on prompts.
    *   `/api/generate-summary` (`src/app/api/generate-summary/route.tsx`):  Used in Challenge 3 for generating summaries of GCP documentation content.

*   **Langchain Processing Chains (`src/lib/langchain/TranscriptSummChain.tsx`):**  Langchain is the framework that structures the AI workflow.  The application uses three main chains:
    *   **Task Extraction Chain (`createTaskExtractionChain`):**  Analyzes the transcript and extracts technical questions or tasks.
    *   **Research Chain (`createResearchChain`):**  For each task, it searches the Firestore knowledge base and uses the Gemini API to research and find answers in the GCP documentation.
    *   **Email Generation Chain (`createEmailChain`):**  Takes the extracted tasks and research findings and generates a draft follow-up email.

*   **Gemini API (`src/lib/google-ai-studio/gemini.ts`):** This service acts as an interface to Google's Gemini family of Generative AI models. It's used for:
    *   Generating text for task extraction, research answers, and email drafts.
    *   Potentially for creating embeddings (though not explicitly shown in the provided snippets, embedding creation is a common use case for Gemini).

*   **Firestore Knowledge Base (Firestore):**  This is the database where the GCP documentation is stored in chunks, along with their vector embeddings. It's used for:
    *   Storing indexed GCP documentation content.
    *   Performing vector similarity searches to find relevant documentation for user queries.

*   **Vector Search Util (Conceptual `VectorSearchUtil`):**  This utility (referenced in `src/lib/langchain/TranscriptSummChain.tsx` line 4 and implied to interact with Firestore) handles the vector search queries against the Firestore knowledge base to retrieve relevant document chunks.

*   **Langfuse (Optional Langfuse):**  Integrated for Challenge 5, Langfuse is an observability platform for LLM applications. It helps to:
    *   Trace the execution of Langchain chains.
    *   Monitor performance and identify bottlenecks.
    *   Evaluate and compare different prompts and model configurations.

*   **GCP Generative AI Models (LLMs):**  The powerful Large Language Models from Google Cloud (like Gemini) that drive the AI capabilities of the application.

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