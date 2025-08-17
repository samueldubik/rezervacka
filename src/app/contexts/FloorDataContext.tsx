import { createContext, useContext, ReactNode } from 'react';
import { useFloorData } from '@/hooks/useFloorData';
import { useGlobalContext } from './GlobalContext';
import { RoomData } from '../../../Types';

interface FloorDataState {
  floorData: RoomData[] | null;
  refetch: () => void;
  loading: boolean;
  error: string | null;
}

const FloorDataContext = createContext<FloorDataState | undefined>(undefined);

const blockNames = ['A', 'C', 'D'];

type FloorDataProviderProps = {
  children: ReactNode;
};

export const FloorDataProvider = ({ children }: FloorDataProviderProps) => {
  const { selectedFloor, block } = useGlobalContext();
  const { floorData, refetch, loading, error } = useFloorData(selectedFloor, blockNames[block]);

  return (
    <FloorDataContext.Provider value={{ floorData, refetch, loading, error }}>
      {children}
    </FloorDataContext.Provider>
  );
};

export const useFloorDataContext = () => {
  const context = useContext(FloorDataContext);
  if (!context) {
    throw new Error('useFloorDataContext must be used within a FloorDataProvider');
  }
  return context;
};
