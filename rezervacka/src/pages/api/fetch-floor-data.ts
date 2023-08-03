import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await db.connect();
    const floorNumber = req.query.floorNumber as string

    // Use the correct syntax for executing the SQL query
    const { rows } = await client.query(`
      SELECT r.name AS room_name,
             r.gender,
             COUNT(s.name) AS number_of_students
      FROM rooms r
      LEFT JOIN students s ON r.name = s.room_name
      WHERE r.name LIKE 'A${floorNumber}%'
      GROUP BY r.name, r.gender
      ORDER BY r.name;
    `);

    // Release the database connection
    client.release();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
