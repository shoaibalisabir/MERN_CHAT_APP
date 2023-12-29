import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "./UserContext";

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
    let [user, setUser] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        const userData = localStorage.getItem("userdata");
        // console.log(userData);
        setUser(userData);
        if (userData) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;