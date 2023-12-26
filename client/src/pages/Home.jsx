import React from "react";
import { Button } from "@chakra-ui/react";

const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';

    };

    return (
        <>
            <Button colorScheme='blue'>Button</Button>
            <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
        </>

    )
}

export default Home