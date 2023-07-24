import { Dispatch, SetStateAction, createContext } from "react"
import { GENDER } from "./Const";
import { IRoomData } from "@/components/FloorLayout";

export interface IStudent {
    name: string;
    email: string;
}

interface GlobalContextValue {
    students: IStudent[];
    setStudents: Dispatch<SetStateAction<IStudent[]>>;
    selectedRoom: IRoomData | undefined;
    setSelectedRoom: Dispatch<SetStateAction<IRoomData | undefined>>;
    gender: GENDER
    setGender: Dispatch<SetStateAction<GENDER>>
}

const GlobalContext = createContext<GlobalContextValue>({
    students: [],
    setStudents: () => {},
    selectedRoom: undefined,
    setSelectedRoom: () => {},
    gender: GENDER.NONE,
    setGender: () => {},
})

export default GlobalContext