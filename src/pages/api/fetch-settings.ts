import pool from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();

    // Query to fetch all settings
    const query = `SELECT * FROM settings`;
    const { rows } = await client.query(query);

    client.release(); // Release the database connection

    res.status(200).json(rows); // Return the settings as JSON
  } catch (error: unknown) {
    console.error('Error fetching data:', error);

    // Send a generic error message for any other database-related errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
