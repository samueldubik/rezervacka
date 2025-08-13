import { useEffect, useState, useCallback } from 'react';
import { RoomData } from '../../Types';
import { GENDER } from '@prisma/client';
import { useGlobalContext } from '../../GlobalContext';

export const useFloorData = (selectedFloor: number, block: string) => {
  const [floorData, setFloorData] = useState<RoomData[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedRoomName } = useGlobalContext();

  const fetchFloorData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/fetchFloorData?floorNumber=${selectedFloor}&blockName=${block}`,
      );
      const data = await response.json();
      setFloorData(
        data.map(
          (item: { name: string; gender: GENDER; studentsCount: number; isBlocked: boolean }) => ({
            name: item.name,
            gender: item.gender,
            studentsCount: item.studentsCount,
            isBlocked: item.isBlocked,
          }),
        ),
      );
    } catch {
      setFloorData(null);
      setError('Failed to fetch floor data');
    } finally {
      setLoading(false);
    }
  }, [selectedFloor, block]);

  useEffect(() => {
    fetchFloorData();
  }, [fetchFloorData]);

  return { floorData, error, loading };
};
