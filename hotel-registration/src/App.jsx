import Dashboard from "./components/ui/dahboard"
import Login from "./pages/login"
import { Routes, Route } from 'react-router-dom'
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </>
  )
}