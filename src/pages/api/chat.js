// pages/api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API request failed with status ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred while processing the request:", error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
}

