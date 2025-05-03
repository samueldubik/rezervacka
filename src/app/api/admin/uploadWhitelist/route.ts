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
  let client;

  if (req.method === 'DELETE') {
    try {
      client = await pool.connect();
      await client.query('BEGIN');
      await client.query('DELETE FROM whitelist');
      await client.query('COMMIT');
      res.status(200).json({ message: 'Whitelist cleared successfully.' });
    } catch (error) {
      console.error('Error clearing whitelist:', error);
      if (client) {
        await client.query('ROLLBACK');
      }
      res.status(500).json({ message: 'Failed to clear whitelist.' });
    } finally {
      if (client) {
        client.release();
      }
    }
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { emails } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ message: 'Invalid email list provided.' });
  }

  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // Clear existing whitelist
    await client.query('DELETE FROM whitelist');

    // Insert new whitelist
    const insertWhitelistQuery =
      'INSERT INTO whitelist (email) VALUES ($1) ON CONFLICT (email) DO NOTHING';
    for (const email of emails) {
      await client.query(insertWhitelistQuery, [email]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Whitelist updated successfully.' });
  } catch (error) {
    console.error('Error updating whitelist:', error);
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }
    res.status(500).json({ message: 'Failed to update whitelist' });
  } finally {
    if (client) {
      client.release();
    }
  }
}
