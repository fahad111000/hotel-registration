import { Box } from "@chakra-ui/react"
import Dashboard from "./pages/dahboard"
import Login from "./pages/login"
import RegistrationForm from "./pages/registration"
import GuestList from "./pages/guestlist"
import GuestRecords from "./pages/guestRecords"
import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import GuestProvider from "./context/guestContext"



export default function App() {

  return (
    <GuestProvider>

      <Box>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guestlist" element={<GuestList />} />
          <Route path="/guestRecords" element={<GuestRecords />} />
        </Routes>
      </Box>
    </GuestProvider>

  )
}