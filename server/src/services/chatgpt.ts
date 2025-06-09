export async function classifyStrain(text: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return 'Unclassified';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Classify this cannabis strain description: ${text}`,
          },
        ],
      }),
    });
    if (!response.ok) {
      return 'Unclassified';
    }
    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch {
    return 'Unclassified';
  }
}
