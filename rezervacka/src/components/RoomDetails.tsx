import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../GlobalContext";
import Button from "./Button";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { BUTTONBORDER, DATABASERESPONSE, GENDER, IRoomData } from "../../Const";

type Props = {
    data: IRoomData | undefined;
};

const RoomDetails = ({ data }: Props) => {
    const line = 'flex flex-row mx-auto w-[85%] shadow-lg border-4 border-stone-800 h-[6vh] mt-2';
    const label = "font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh]";
    const value = "font-fira-sans font-semibold text-form w-1/2 text-center pt-[1vh]";
    
    const context = useContext(GlobalContext);
    const { gender, selectedRoom, students, correctForm } = context;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [available, setAvailable] = useState<boolean>(false);
    const [feedBack, setFeedBack] = useState<DATABASERESPONSE>(DATABASERESPONSE.NONE);
    const [whitelist, setWhitelist] = useState<string[]>([]);

    // Fetch whitelist data
    useEffect(() => {
        const fetchWhitelist = async () => {
            try {
                const response = await fetch("/api/fetch-whitelist");
                if (response.ok) {
                    const data = await response.json();
                    setWhitelist(data.map((item: { email: string }) => item.email));
                } else {
                    console.error('Failed to fetch whitelist');
                }
            } catch (error) {
                console.error('Error fetching whitelist:', error);
            }
        };

        fetchWhitelist();
    }, []);

    // Check if reservation is available
    const isAvailable = () => {
        if (!data) return false;

        // Check student count
        if (data?.students + students.length > 4) return false;

        // Check gender
        if (gender && data?.gender && data?.gender !== gender) return false;

        // Check whitelist
        if (whitelist.length > 0) {
            const studentEmails = students.map(student => student.email);
            const hasWhitelistedStudent = studentEmails.some(email => whitelist.includes(email));
            return hasWhitelistedStudent;
        }

        return true;        
    };

    useEffect(() => {
        setAvailable(isAvailable());
    }, [students, data, gender, whitelist]);

    // Determine if the selected room has a balcony
    const hasBalcony = () => {
        if (!selectedRoom?.room) return false;
        const balconyRooms = ['2', '5', '9', '12'];
        return balconyRooms.includes(selectedRoom.room.charAt(3));
    };

    // Get gender caption
    const getGenderCaption = () => {
        switch (data?.gender) {
            case GENDER.MALE: return "MUŽSKÁ";
            case GENDER.FEMALE: return "ŽENSKÁ";
            default: return '';
        }
    };

    const balcony = hasBalcony();

    // Reserve room
    const reserveRoom = async () => {
        try {
            setIsLoading(true);
            
            const requestData = {
                gender: gender === GENDER.MALE ? true : false,
                roomName: selectedRoom?.room,
                students: [...students],
            };

            const response = await fetch("/api/reserve-rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                console.log("Reservation and gender update successful.");
                setFeedBack(DATABASERESPONSE.SUCCESS);
            } else {
                const errorData = await response.json();
                if (errorData.error === DATABASERESPONSE.ALREADYUSED) {
                    setFeedBack(DATABASERESPONSE.ALREADYUSED);
                } else {
                    setFeedBack(DATABASERESPONSE.ERROR);
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error triggering API:", error);
            setIsLoading(false);
        }
    };

    const getButtonLabel = () => {
        if (!correctForm) return "Chyba";
        if (!available) {
            if (whitelist.length > 0) {
                return "Nepovolené";
            }
            return "Obsadené";
        }
        return "Rezervovať";
    };

    if (selectedRoom && students.length > 0) {
        return (
            <div className="border-8 shadow-lg border-stone-800 w-[20vw] h-[50vh] mt-[10vh]">
                <h2 className="text-center mt-5 text-3xl font-tektur font-bold mb-5">IZBA {selectedRoom?.room}</h2>

                <div className={line}>
                    <h3 className={label}>BALKÓN:</h3>
                    <h3 className={value}>{balcony ? 'ÁNO' : 'NIE'}</h3>
                </div>

                <div className={line}>
                    <h3 className={label}>IZBA:</h3>
                    <h3 className={value}>{getGenderCaption()}</h3>
                </div>  

                <div className={line}>
                    <h3 className={label}>MIESTA:</h3>
                    <h3 className={value}>{4 - selectedRoom?.students}</h3>
                </div> 

                <div className="w-full mb-10">
                    <Button 
                        label={getButtonLabel()} 
                        icon={faBook} 
                        loading={isLoading}
                        action={correctForm && available ? reserveRoom : () => console.log('Form Error')} 
                        border={correctForm && available ? BUTTONBORDER.BLACK : BUTTONBORDER.ERROR} 
                        black
                    />
                    {feedBack === DATABASERESPONSE.SUCCESS && 
                        <h2 className="mt-2 font-fira-sans text-center text-green-500 font-semibold text-sm">
                            REZERVÁCIA ÚSPEŠNÁ
                        </h2>
                    }
                    {feedBack === DATABASERESPONSE.ERROR &&
                        <h2 className="mt-2 font-fira-sans text-center text-red-500 font-semibold text-sm">
                            REZERVÁCIA NEÚSPEŠNÁ
                        </h2>
                    }
                    {feedBack === DATABASERESPONSE.ALREADYUSED &&
                        <h2 className="mt-2 font-fira-sans text-center text-red-500 font-semibold text-sm">
                            ŠTUDENT UŽ JE REGISTROVANÝ
                        </h2>
                    }
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default RoomDetails;
