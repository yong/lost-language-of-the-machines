// pages/api/token.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Generate a UUID for the user
    const userId = uuidv4();

    // Generate a JWT that expires in 5 minutes
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '5m' });

    // Send the token back to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error("An error occurred while processing the request:", error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
}
