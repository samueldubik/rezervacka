import { useEffect, useState } from 'react';
import { GENDER } from '../../Const';
import { IRoomData } from '@/components/FloorLayout';

const blockNames = ['A', 'C', 'D'];


export const useFloorData = (selectedFloor: number, block: number) => {
  const [floorData, setFloorData] = useState<IRoomData[] | null>([]);
  
  useEffect(() => {
    console.log('FIRE')
    fetch(`/api/fetch-floor-data?floorNumber=${selectedFloor}&blockName=${blockNames[block]}`)
      .then((response) => response.json())
      .then((data) => {
        setFloorData(data.map((item: { room_name: any; gender: boolean; number_of_students: string }) => {
          let tmp: GENDER;

          if (item.gender === null) {
            tmp = GENDER.NONE;
          } else if (item.gender === true) {
            tmp = GENDER.MALE;
          } else {
            tmp = GENDER.FEMALE;
          }

          return {
            room: item.room_name,
            gender: tmp,
            students: parseInt(item.number_of_students),
          };
        }));
      })
      .catch(() => {
        console.log('data not received');
        setFloorData(null);
      });
  }, [selectedFloor, block]);
  console.log(floorData)
  return floorData;
};
