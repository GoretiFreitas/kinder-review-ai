
interface SentenceAnalysis {
  originalSentence: string;
  suggestions: string[];
  issues: string[];
  improvedVersion: string;
  reasoning: string;
}

interface AnalyzeTextRequest {
  text: string;
  context: string;
  sectionType: string;
}

export async function analyzeSentences(
  request: AnalyzeTextRequest,
  apiKey: string
): Promise<SentenceAnalysis[]> {
  const { text, context, sectionType } = request;
  
  // Split text into sentences (simple approach - can be improved)
  const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
  
  const prompt = `You are a expert academic peer reviewer. Analyze each sentence in the ${sectionType} section of an academic paper and provide detailed feedback.

Context: ${context}

For each sentence, provide:
1. Specific issues (grammar, clarity, academic tone, structure)
2. Concrete suggestions for improvement
3. An improved version of the sentence
4. Brief reasoning for the changes

Format your response as a JSON array of objects with this structure:
{
  "originalSentence": "...",
  "suggestions": ["suggestion1", "suggestion2"],
  "issues": ["issue1", "issue2"],
  "improvedVersion": "...",
  "reasoning": "..."
}

Sentences to analyze:
${sentences.map((s, i) => `${i + 1}. ${s.trim()}`).join('\n')}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert academic peer reviewer. Provide detailed, constructive feedback in JSON format only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const analyses = JSON.parse(content);
    
    return analyses.map((analysis: any, index: number) => ({
      originalSentence: sentences[index]?.trim() || analysis.originalSentence,
      suggestions: analysis.suggestions || [],
      issues: analysis.issues || [],
      improvedVersion: analysis.improvedVersion || sentences[index],
      reasoning: analysis.reasoning || ''
    }));
    
  } catch (error) {
    console.error('Error analyzing sentences:', error);
    throw new Error('Failed to analyze sentences. Please check your API key and try again.');
  }
}
