import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {

    const navigate = useNavigate();
    
    const logout = () => {
        navigate('/')

    }

    return <>
        <h1>Dashboard Open!</h1>
        <Button onClick={logout}>Logout</Button>
    </>
}