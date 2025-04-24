import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let client;

  try {
    client = await pool.connect();

    // Use SQL's NOT operator to toggle the boolean value
    const updateQuery = `
      UPDATE settings
      SET value = NOT value
      WHERE key = 'reservations_enabled'
      RETURNING value;
    `;

    const { rows } = await client.query(updateQuery);
    const newStatus = rows[0]?.value;

    res.status(200).json({ message: 'Reservation status updated successfully.', newStatus });
  } catch (error) {
    console.error('Error toggling reservation status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      client.release();
    }
  }
}
