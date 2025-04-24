import pool from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const floorNumber = req.query.floorNumber as string;
    const blockName = req.query.blockName as string;

    // Use parameterized query to prevent SQL injection
    const query = `
      SELECT r.name AS room_name,
             r.gender,
             COUNT(s.name) AS number_of_students
      FROM rooms r
      LEFT JOIN students s ON r.name = s.room_name
      WHERE r.name LIKE $1
      GROUP BY r.name, r.gender
      ORDER BY r.name;
    `;

    const values = [`${blockName}${floorNumber}%`];
    const { rows } = await client.query(query, values);
    // Release the database connection
    client.release();
    res.status(200).json(rows);
  } catch (error: unknown) {
    console.log('Error fetching data:', error);

    if (error instanceof Error && (error as any).code === '42P01') {
      res.status(404).json({ error: 'Reservation is not available yet.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
