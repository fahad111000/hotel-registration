import { createContext, useContext, useState } from "react";

// context Box
const guestContext = createContext();

// proveder
export default function GuestProvider({ children }) {
    const [guests, setGuest] = useState([])
    const [records, setRecords] = useState([])

    const addGuest = (guest) => {
        setGuest(prev => [...prev, guest]);
        setRecords(prev => [...prev, guest])
    }

    const updateGuest = (index, updatedGuest) => {

        setGuest(prev => prev.map((guest, i) =>
            i === index ? updatedGuest : guest
        ))

        setRecords(prev => prev.map((record, i) =>
            i === index ? updatedGuest : record
        ))

    }

    // const updateRecords = (index, updatedRecord) => {
    //     setRecords(prev => prev.map((guest, i) =>
    //         i === index ? updatedRecord : guest
    //     ))

    // }

    // delete entry
    const deleteEntry = (index) => { setGuest(prev => prev.filter((_, i) => index !== i)) }

    return (
        <guestContext.Provider value={{ guests, addGuest, deleteEntry, updateGuest, records }}>
            {children}
        </guestContext.Provider>
    )
}

export function useGuest() {
    return useContext(guestContext)
}