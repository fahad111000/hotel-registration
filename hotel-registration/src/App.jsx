import { Box } from "@chakra-ui/react"
import Dashboard from "./pages/dahboard"
import Login from "./pages/login"
import RegistrationForm from "./pages/registration"
import GuestList from "./pages/guestlist"
import { Routes, Route } from 'react-router-dom'
import { useState } from "react"



export default function App() {

  const [guests, setGuest] = useState([])

  const addGuest = (guest) => {
    setGuest([...guests, guest])
  }


  return (
    <Box >

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/guestlist" element={<GuestList addGuest={addGuest} guests={guests} />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </Box>

  )
}