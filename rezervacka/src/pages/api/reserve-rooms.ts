import { NextApiRequest, NextApiResponse } from "next";
import { IStudent } from "../../../GlobalContext";
import { db } from "@vercel/postgres";
import { DATABASERESPONSE } from "../../../Const";



async function getTotalStudentsCountForRoom(client: any, roomName: string): Promise<number> {
  const query = `
    SELECT COUNT(*) AS count
    FROM students
    WHERE room_name = $1;
  `;

  const result = await client.query(query, [roomName]);

  //console.log("RESULT:" , result.rows[0].count)

  return parseInt(result.rows[0].count);
}

async function getRoomGender(client: any, roomName: string): Promise<boolean | null> {
  const query = `
    SELECT gender
    FROM rooms
    WHERE name = $1;
  `;

  const result = await client.query(query, [roomName]);
  return result.rows[0].gender;
}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    //console.log("TESTING...")
    const client = await db.connect();

    //console.log("CLIENT CONNECTED...")

    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
      }
  

      //console.log("METHOD ALOWED...")
      
      interface RequestData {
        gender: boolean;
        roomName: string;
        students: IStudent[];
      }
  
      const { gender, roomName, students }: RequestData = req.body;



      if (!roomName || !students) {
        res.status(400).json({ error: "gender, roomName, and students are required fields in the request body." });
        return;
      }

      //console.log("DATA RECEIVED...")

      await client.query("BEGIN;");

      //console.log("QUERY BEGIN...")

      const totalStudentsCount = students.length + (await getTotalStudentsCountForRoom(client, roomName));

      //console.log("TOTAL STUDENT COUNT: ",totalStudentsCount)

      if (totalStudentsCount > 4) {
        res.status(400).json({ error: "Room capacity exceeded. Maximum 4 students allowed." });
        return;
      }

  
      const currentRoomGender = await getRoomGender(client, roomName);
      if (currentRoomGender !== null && currentRoomGender !== gender) {
        res.status(400).json({ error: "Room gender mismatch." });
        return;
      }

  
      const placeholders = students.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(", ");
      const studentValues = students.flatMap(({ name, email }) => [name, roomName, email]);
      
      const queryInsert = `
        INSERT INTO students (name, room_name, email)
        VALUES ${placeholders};
      `;
  
      const queryUpdate = `
        UPDATE rooms
        SET gender = $1
        WHERE name = $2;
      `;
  
      await client.query(queryInsert, studentValues);
      await client.query(queryUpdate, [gender, roomName]);
  
      await client.query("COMMIT;");
  
      res.status(200).json({ message: "Reservation and gender update successful." });
    } catch (error : any) {
      await client.query("ROLLBACK;");

      console.error("Error fetching data:", error);

      if(error.code === '23505'){
        res.status(400).json({error: DATABASERESPONSE.ALREADYUSED})
      } else {
      res.status(500).json({ error: DATABASERESPONSE.ERROR});
      }

    } finally {
      client.release();
    }
  }
  