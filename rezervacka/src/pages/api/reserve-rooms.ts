import { NextApiRequest, NextApiResponse } from "next";
import { IStudent } from "../../../GlobalContext";
import { db } from "@vercel/postgres";
import { DATABASERESPONSE } from "../../../Const";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const client = await db.connect();


    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
      }
  

  
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


      await client.query("BEGIN;");
  
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
  