import { Button } from "@chakra-ui/react";
// import { useContext } from "react";
// import UserContext from "../context/UserContext";

const Dashboard = () => {

    // const userInfoLocalStorage = JSON.parse(localStorage.getItem("userdata"));
    // console.log(userInfoLocalStorage);



    const handleLogout = () => {
        localStorage.removeItem('userdata');
        window.location = '/';
    };

    return (
        <>
            <Button colorScheme='blue'>Button</Button>
            <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
        </>

    )
}

export default Dashboard