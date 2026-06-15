import { Box } from "@chakra-ui/react"
import Dashboard from "./pages/dahboard"
import Login from "./pages/login"
import RegistrationForm from "./pages/registration"
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Box >

      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes> */}
      <RegistrationForm />

    </Box>

  )
}