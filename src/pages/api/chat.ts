// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secretKey: jwt.Secret | undefined = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ error: 'JWT secret key is not set' });
    }

    // Verify the token
    jwt.verify(token, secretKey);

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"messages": req.body, "model": "gpt-4o"})
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
