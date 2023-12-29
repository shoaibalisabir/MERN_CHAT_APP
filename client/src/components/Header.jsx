import { InputGroup, InputLeftElement, Input, Text, Menu, MenuButton, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {

    let { setUser, user } = useContext(UserContext);



    const handleLogout = () => {
        setUser(null);
        // console.log("User Data Header:", user);
        localStorage.removeItem('userdata');
        window.location = '/';
    };

    return (
        <div className='w-full h-16 bg-black flex justify-between items-center pr-10 pl-10 text-white'>
            <div className='w-1/3 flex justify-start'>
                <InputGroup w="50%">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search User' />
                </InputGroup>
            </div>
            <div className='w-1/3 flex justify-center' >
                <Text fontSize="xl">Honest Chat Conversation</Text>
            </div>
            <div className='w-1/3 flex justify-end'>
                <Menu>
                    <MenuButton as={Button} colorScheme='red' onClick={handleLogout}>
                        Logout
                    </MenuButton>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
