import { Dispatch, SetStateAction, createContext } from "react"
import { GENDER } from "./Const";

export interface IStudent {
    name: string;
    email: string;
}

interface GlobalContextValue {
    students: IStudent[];
    setStudents: Dispatch<SetStateAction<IStudent[]>>;
    selectedRoom: string;
    setSelectedRoom: Dispatch<SetStateAction<string>>;
    gender: GENDER
    setGender: Dispatch<SetStateAction<GENDER>>
}

const GlobalContext = createContext<GlobalContextValue>({
    students: [],
    setStudents: () => {},
    selectedRoom: '',
    setSelectedRoom: () => {},
    gender: GENDER.NONE,
    setGender: () => {},
})

export default GlobalContext