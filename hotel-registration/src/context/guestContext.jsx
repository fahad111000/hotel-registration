import { createContext, useContext, useState } from "react";

// context Box
const guestContext = createContext();

// proveder
export default function GuestProvider({ children }) {
    const [guests, setGuest] = useState([])

    const addGuest = (guest) => {
        setGuest([...guests, guest])
    }

    const updateGuest = (index, updatedGuest) => {
        setGuest(prev => prev.map((guest, i) =>
            i === index ? updatedGuest : guest
        ))
    }

    // delete entry
    const deleteEntry = (index) => { setGuest(prev => prev.filter((_, i) => index !== i)) }

    return (
        <guestContext.Provider value={{ guests, addGuest, deleteEntry, updateGuest }}>
            {children}
        </guestContext.Provider>
    )
}

export function useGuest() {
    return useContext(guestContext)
}