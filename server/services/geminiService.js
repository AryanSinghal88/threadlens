export const analyzeComments = async (title, description, comments) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    const commentsText = comments
      .map((comment, index) => `Comment ${index + 1}: ${comment}`)
      .join('\n\n')

    const prompt = `
You are analyzing a YouTube video's comments to extract genuine public opinion.

Video Title: "${title}"
${description ? `Video Description: "${description}"` : ''}

Here are the comments from the video:

${commentsText}

Based on these comments, provide a structured analysis in the following JSON format. Return ONLY the JSON object, no extra text, no markdown, no backticks:

{
  "consensus": "What most people in the comments agree on (2-3 sentences)",
  "topPraise": "The most common positive opinion or praise mentioned (1-2 sentences)",
  "topComplaint": "The most common complaint or criticism mentioned (1-2 sentences)",
  "contrarian": "A surprising or minority opinion that challenges the mainstream view (1-2 sentences)",
  "verdict": "One single sentence summarizing the overall comment sentiment"
}

Be specific and direct. Base everything strictly on what the comments actually say. Do not add your own opinions.
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(data.error))
    }

    const responseText = data.candidates[0].content.parts[0].text

    const cleanedResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    const analysis = JSON.parse(cleanedResponse)

    const requiredFields = [
      'consensus',
      'topPraise',
      'topComplaint',
      'contrarian',
      'verdict',
    ]

    for (const field of requiredFields) {
      if (!analysis[field]) {
        throw new Error(`Missing field in AI response: ${field}`)
      }
    }

    return analysis
  } catch (error) {
    throw new Error(`Gemini analysis failed: ${error.message}`)
  }
}