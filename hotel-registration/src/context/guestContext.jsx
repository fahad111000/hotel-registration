import { createContext, useContext, useState } from "react";

// context Box
const guestContext = createContext();

// proveder
export default function GuestProvider({ children }) {
    const [guests, setGuest] = useState([])

    const addGuest = (guest) => {
        setGuest([...guests, guest])
    }

    return (
        <guestContext.Provider value={{ guests, addGuest }}>
            {children}
        </guestContext.Provider>
    )
}

export function useGuest() {
    return useContext(guestContext)
}