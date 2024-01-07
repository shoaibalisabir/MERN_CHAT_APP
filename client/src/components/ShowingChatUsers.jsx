import React, { useState, useEffect } from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box, Button, Flex, Heading, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import GroupChatBox from './GroupChatBox';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../someLogics/ChatLogics';

const ShowingChatUsers = () => {

    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, chats, setChats, user, userToken } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            };


            const { data } = await axios.get("http://localhost:8000/api/chats", config);
            console.log(data);
            setChats(data);

        } catch (error) {
            toast({
                title: "Error getting the chats",
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };



    useEffect(() => {
        if (userToken) {
            setLoggedUser(JSON.parse(localStorage.getItem("userdata")));
            fetchChats();
        }
    }, [userToken]);



    return (
        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="tomato"
            w="100%"
            h="100%"
            borderRadius="lg"
            borderWidth="1px"
        >

            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Heading size='md'>My Chats</Heading>
                </Box>
                <Spacer />

                <Button
                    d="flex"
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon />}
                >
                    New Group Chat
                </Button>
            </Flex>

            <Box className='flex bg-white mt-5 rounded-md p-5'
            >
                {chats ? (<Stack overflowY={scroll} width="100%">
                    {chats.map((chat) => (
                        <Box
                            onClick={() => setSelectedChat(chat)}
                            cursor="pointer"
                            bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                            color={selectedChat === chat ? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius="lg"
                            key={chat._id}
                        >
                            <Text>
                                {!chat.isGroupChat
                                    ? getSender(loggedUser, chat.users)
                                    : chat.chatName}
                            </Text>
                            {chat.latestMessage && (
                                <Text fontSize="xs">
                                    <b>{chat.latestMessage.sender.name} : </b>
                                    {chat.latestMessage.content.length > 50
                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                        : chat.latestMessage.content}
                                </Text>
                            )}
                        </Box>
                    ))}
                </Stack>

                ) : (<ChatLoading />)}
            </Box>

        </Box>
    );
};

export default ShowingChatUsers