import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const dropStudentsTableQuery = `DROP TABLE IF EXISTS students CASCADE;`;
  const dropRoomsTableQuery = `DROP TABLE IF EXISTS rooms CASCADE;`;
  const dropWhitelistTableQuery = `DROP TABLE IF EXISTS whitelist CASCADE;`;
  const dropScheduleTableQuery = `DROP TABLE IF EXISTS schedule CASCADE;`;
  const dropSettingsTableQuery = `DROP TABLE IF EXISTS settings CASCADE;`;

  const createRoomsTableQuery = `
    CREATE TABLE rooms (
      name VARCHAR(100) PRIMARY KEY,
      gender BOOLEAN
    );
  `;

  const createStudentsTableQuery = `
    CREATE TABLE students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      room_name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      FOREIGN KEY (room_name) REFERENCES rooms(name)
    );
  `;

  const createWhitelistTableQuery = `
    CREATE TABLE whitelist (
      email VARCHAR(100) PRIMARY KEY
    );
  `;

  const createScheduleTableQuery = `
    CREATE TABLE schedule (
      id SERIAL PRIMARY KEY,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL
    );
  `;

  const createSettingsTableQuery = `
    CREATE TABLE settings (
      id SERIAL PRIMARY KEY,
      key VARCHAR(100) UNIQUE NOT NULL,
      value BOOLEAN NOT NULL
    );
  `;

  const insertRoomsQuery = `
    INSERT INTO rooms (name, gender)
    VALUES ($1, NULL)
    ON CONFLICT (name) DO NOTHING;
  `;

  let client; // Declare client outside the try block

  try {
    console.log('Room reset start');
    client = await pool.connect(); // Assign client here
    await client.query('BEGIN');

    // Drop existing tables
    await client.query(dropStudentsTableQuery);
    await client.query(dropRoomsTableQuery);
    await client.query(dropWhitelistTableQuery);
    await client.query(dropScheduleTableQuery);
    await client.query(dropSettingsTableQuery);

    // Create new tables
    await client.query(createRoomsTableQuery);
    await client.query(createStudentsTableQuery);
    await client.query(createWhitelistTableQuery);
    await client.query(createScheduleTableQuery);
    await client.query(createSettingsTableQuery);

    // Populate the rooms table
    const blocks = ['A', 'B', 'C', 'D'];
    for (const block of blocks) {
      for (let floor = 1; floor <= 7; floor++) {
        for (let room = 1; room <= 13; room++) {
          const roomName = `${block}${floor}${room.toString().padStart(2, '0')}`;
          await client.query(insertRoomsQuery, [roomName]);
        }
      }
    }

    // Insert default setting for reservations (enabled)
    await client.query(
      `INSERT INTO settings (key, value) VALUES ('reservations_enabled', true) ON CONFLICT (key) DO NOTHING;`,
    );

    await client.query('COMMIT');
    console.log('Tables recreated');
    res.status(200).json({ message: 'Tables created and populated successfully' });
  } catch (error) {
    console.error('Error creating tables or populating rooms:', error);
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }
    }
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (client) {
      client.release();
    }
  }
}
