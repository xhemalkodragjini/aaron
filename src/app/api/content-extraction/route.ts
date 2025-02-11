import { NextRequest, NextResponse } from 'next/server';
import { DocumentScraper } from '../indexing/scraping';
import { initializeGeminiService } from '@/lib/google-ai-studio/gemini';
import { PromptTemplate } from "@langchain/core/prompts";

const docScraper = new DocumentScraper();

// Create extraction prompt template
const extractionPrompt = PromptTemplate.fromTemplate(`
  You are a specialized content extraction expert. Extract relevant content from {htmlContent}.
  Identify sections matching the {entityDescription}.
  Extract the full original content, preserving structure.
  Remove navigation and boilerplate.
  Preserve technical details and code snippets.
  Format the output as clean, structured text.
  Avoid summarization and return full text.
  Evaluate all parts of the HTML input.
  Return cleaned text, not HTML code.
  `);

export async function POST(request: NextRequest) {
  try {
    const { urls, entityDescription } = await request.json();
    console.log("Content Extraction for: ", urls, entityDescription)
    const geminiService = initializeGeminiService("gemini-1.5-flash-8b");

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({
        error: 'Valid URLs array is required'
      }, { status: 400 });
    }

    if (!entityDescription) {
      return NextResponse.json({
        error: 'Entity description is required'
      }, { status: 400 });
    }

    const results = await Promise.all(urls.map(async (url) => {
      try {
        // Scrape the URL
        const scrapedContent = await docScraper.scrapeUrl(url);

        // console.log("Scraped Content (" , url ,"): ", scrapedContent)

        // Format the prompt
        const formattedPrompt = await extractionPrompt.format({
          entityDescription,
          htmlContent: scrapedContent.rawHTML,
        });

        // Get structured response from Gemini
        const extractionResult = await geminiService.generateContent(formattedPrompt);

        // console.log('Extraction Result:', extractionResult);

        return {
          url,
          status: 'success',
          data: extractionResult,
        };

      } catch (error) {
        console.error(`Error processing URL ${url}:`, error);
        return {
          url,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to process URL'
        };
      }
    }));

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Content extraction error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to extract content',
      status: 'error'
    }, { status: 500 });
  }
}