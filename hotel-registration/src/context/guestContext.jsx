import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

// context Box
const guestContext = createContext();

// provider
export default function GuestProvider({ children }) {

    useEffect(() => {
        const checkExpire = () => {
            const savedGuests = JSON.parse(localStorage.getItem('guests') || '[]');

            const UpdatedGuests = savedGuests.filter((guest) => {
                const diff = Date.now() - guest.createdAt;
                return diff < 24 * 60 * 60 * 1000;

            });

            setGuest(UpdatedGuests);
            localStorage.setItem("guests", JSON.stringify(UpdatedGuests));


        }


        checkExpire();
        const interval = setInterval(checkExpire, 10 * 1000);

        return () => clearInterval(interval);

    }, [])

    const [guests, setGuest] = useState(() => {
        const savedData = localStorage.getItem('guests');
        return savedData ? JSON.parse(savedData) : []
    })




    const [records, setRecords] = useState(() => {
        const savedData = localStorage.getItem('records')
        return savedData ? JSON.parse(savedData) : []
    })

    const addGuest = (guest) => {

        const newGuest = {
            ...guest,
            createdAt: Date.now(),

        }

        setGuest(prev => {
            const updatedData = [...prev, newGuest]
            localStorage.setItem('guests', JSON.stringify(updatedData));
            return updatedData
        })

        setRecords(prev => {
            const updatedData = [...prev, newGuest]
            localStorage.setItem('records', JSON.stringify(updatedData))
            return updatedData
        })
    }

    const updateGuest = (index, updatedGuest) => {
        const updatedData = guests.map((guest, i) =>
            i === index ? updatedGuest : guest
        )
        setGuest(updatedData);
        localStorage.setItem('guests', JSON.stringify(updatedData))

        setRecords(prev => prev.map((record, i) =>
            i === index ? updatedGuest : record
        ))

    }

    // delete entry
    const deleteEntry = (index) => {
        const updatedData = guests.filter((_, i) => index !== i)
        setGuest(updatedData)
        localStorage.setItem('guests', JSON.stringify(updatedData))
    }

    return (
        <guestContext.Provider value={{ guests, addGuest, deleteEntry, updateGuest, records }}>
            {children}
        </guestContext.Provider>
    )
}

export function useGuest() {
    return useContext(guestContext)
}