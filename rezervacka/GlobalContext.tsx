import { Dispatch, SetStateAction, createContext } from "react"
import { GENDER, IRoomData } from "./Const";

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
    correctForm: boolean
    setCorrectForm: Dispatch<SetStateAction<boolean>>
    floorData: IRoomData[] | null
    setFloorData: Dispatch<SetStateAction<IRoomData[] | null>>
    formsVisible: boolean,
    setFormsVisible: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContextValue>({
    students: [],
    setStudents: () => {},
    selectedRoom: undefined,
    setSelectedRoom: () => {},
    gender: GENDER.NONE,
    setGender: () => {},
    correctForm: false,
    setCorrectForm: () => {},
    floorData: [],
    setFloorData: () => {},
    formsVisible: false,
    setFormsVisible: () => {}
})

export default GlobalContext