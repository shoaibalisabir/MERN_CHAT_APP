import {
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    Menu,
    MenuButton,
    Button, Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    useToast,
    Box,
    Spinner
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const Header = () => {

    const { setUser, user, setSelectedChat, chats, setChats, setUserToken } = ChatState();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    var userData;
    var userToken;


    userData = user;

    try {
        if (userData) {
            // console.log("User From Context: ", JSON.parse(userData));
        }
    } catch (error) {
        console.log("Error is:", error);
    }

    useEffect(() => {

        setUserToken(userToken);

    }, [])


    // setTimeout(() => {

    //     userData = JSON.parse(user);
    //     console.log("userData", userData);
    //     userToken = userData.data.data;
    //     console.log("User Token:", userToken);
    // }, 4000);

    const userInfoLocalStorage = JSON.parse(localStorage.getItem("userdata"));
    userToken = userInfoLocalStorage.data.data;
    // setUserToken(userToken);
    // console.log("userInfoLocalStorage", userToken);


    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        setUser(null);
        // console.log("User Data Header:", user);
        localStorage.removeItem('userdata');
        window.location = '/';
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                }
            };

            const { data } = await axios.post("http://localhost:8000/api/chats", { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error getting the chat",
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleSearchUser = async () => {

        if (!search) {
            toast({
                title: 'Error',
                description: "Please enter a name or email first.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        try {
            setLoading(true);

            const config = { headers: { Authorization: `Bearer ${userToken}` } };
            console.log("config", config);

            const { data } = await axios.get(`http://localhost:8000/api/userSearch?search=${search}`, config);

            console.log("Search data", data);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error",
                description: `${error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });

        }
    };

    return (
        <div className='w-full h-16 bg-black flex justify-between items-center pr-10 pl-10 text-white'>
            <div className='w-1/3 flex justify-start'>
                <InputGroup w="50%">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input isReadOnly type='text' placeholder='Search User' onClick={onOpen} />
                </InputGroup>
            </div>
            <div className='w-1/3 flex justify-center' >

                <Text fontSize="xl">Honest Company Conversation</Text>
            </div>
            <div className='w-1/3 flex justify-end'>
                <Menu>
                    <MenuButton as={Button} colorScheme='red' onClick={handleLogout}>
                        Logout
                    </MenuButton>
                </Menu>
            </div>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
                <DrawerOverlay></DrawerOverlay>
                <DrawerContent >
                    <DrawerCloseButton></DrawerCloseButton>
                    <DrawerHeader>Search Users</DrawerHeader>
                    <InputGroup w="80%" mx="auto">
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            type='text'
                            mr={2}
                            placeholder='name or email'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearchUser}
                        >Go</Button>

                    </InputGroup>
                    <Box overflowY="auto" maxHeight="-webkit-max-content" css={{
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                        },
                    }}>
                        {loading ? (<ChatLoading></ChatLoading>) :
                            (searchResult?.map((userSearched) =>
                            (<UserListItem
                                key={userSearched._id}
                                userSearched={userSearched}
                                handleFunction={() => accessChat(userSearched._id)}>
                            </UserListItem>)))}
                    </Box>
                    {loadingChat && <Spinner ml='auto' d='flex'></Spinner>}
                </DrawerContent>
            </Drawer>


        </div>



    );
};

export default Header;
