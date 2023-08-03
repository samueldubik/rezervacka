import { db } from '@vercel/postgres'
import  Main  from '../components/Main'




export default function Home() {
  const _fetchFloorData = async (floor: number) => {
    console.log('CONNECTING...')
  
    const client = await db.connect()
    
    console.log('FETCHING...')
  
    const { rows } = await client.sql`SELECT r.name AS room_name,
                                      r.gender,
                                      COUNT(s.name) AS number_of_students
                                      FROM rooms r
                                      LEFT JOIN students s ON r.name = s.room_name
                                      WHERE r.name LIKE 'A${floor}%'
                                      GROUP BY r.name, r.gender
                                      ORDER BY r.name;`
    console.log(rows)

    return [...rows]
  
  }

  
  return (
  <Main/>
  )
}
