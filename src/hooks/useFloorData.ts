import { useEffect, useState } from 'react';
import { RoomData } from '../../Types';
import { GENDER, Student } from '@prisma/client';

export const useFloorData = (selectedFloor: number, block: string) => {
  const [floorData, setFloorData] = useState<RoomData[] | null>([]);
  useEffect(() => {
    fetch(`/api/fetchFloorData?floorNumber=${selectedFloor}&blockName=${block}`)
      .then((response) => response.json())
      .then((data) => {
        setFloorData(
          data.map((item: { name: string; gender: GENDER; studentsCount: number }) => {
            return {
              name: item.name,
              gender: item.gender,
              studentsCount: item.studentsCount,
            };
          }),
        );
      })
      .catch(() => {
        console.log('data not received');
        setFloorData(null);
      });
  }, [selectedFloor, block]);
  return floorData;
};
