// src/lib/langchain/config.ts
// import { ChatVertexAI } from "langchain/chat_models/googlevertexai";
// import { VertexAIEmbeddings } from "langchain/embeddings/googlevertexai";
import { VertexAI } from "@langchain/google-vertexai";
import { PromptTemplate } from "@langchain/core/prompts";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Base model configuration
export const createGeminiTextModel = (temperature = 1, maxOutputTokens = 8192) => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-exp",
  });
};

// Prompt Templates
export const PROMPT_TEMPLATES = {
  taskExtraction: new PromptTemplate({
    template: `You are an AI assistant helping extract technical tasks from a conversation between a Google Cloud Customer Engineer (CE) and a customer. 
    Analyze the transcript and identify specific technical questions, requirements, or issues that need to be addressed in a follow-up email.
    
    Format the output as a JSON array of tasks, where each task has:
    - description: The technical question or requirement
    - context: Relevant context from the conversation
    
    Transcript:
    {transcript}
    
    Tasks (JSON array):`,
    inputVariables: ["transcript"],
  }),

  research: new PromptTemplate({
    template: `
    Research the following technical task using the provided Google Cloud documentation context.
    
    Task: {task}
    
    Documentation Context:
    {context}
    
    Provide a response that:
    1. Clearly answers the technical question
    2. Includes specific steps or configurations where relevant
    3. Notes any important caveats or best practices
    4. References specific sections of the documentation
    
    {format_instructions}
    
    Technical Response:`,
    inputVariables: ["task", "context", "format_instructions"],
  }),

  emailGeneration: new PromptTemplate({
    template: `Generate a professional follow-up email to the customer based on the technical research results.
    
    Original Tasks:
    {tasks}
    
    Research Findings:
    {research}
    
    Documentation References:
    {docLinks}
    
    Requirements for the email:
    1. Start with a brief meeting reference and summary
    2. Address each technical question comprehensively
    3. Include relevant code snippets or commands where helpful
    4. Link to specific documentation sections for each answer
    5. Maintain a professional but friendly tone
    6. End with next steps or an offer for further clarification
    
    Generated Email:`,
    inputVariables: ["tasks", "research", "docLinks"],
  }),
};

// Output parsers for structured responses
export const outputParserPrompts = {
  tasks: `The output should be a valid JSON array following this structure:
  [
    {
      "description": "string",
      "context": "string"
    }
  ]`,
  research: `The output should be a valid JSON object following this structure:
  {
    "answer": "string",
    "steps": string[],
    "caveats": string[],
    "docReferences": { "title": "string", "url": "string" }[]
  }`,
};