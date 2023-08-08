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
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
