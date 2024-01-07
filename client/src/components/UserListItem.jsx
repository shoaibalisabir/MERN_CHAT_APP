import React, { useContext } from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ userSearched, handleFunction }) => {


    // const { user } = useContext(UserContext);
    // console.log("UserListItem", userSearched);

    return (
        <Box mr={4} ml={4} mt={4} mx="auto"
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="90%"
            d="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={userSearched.firstName}
            />
            <Box>
                <Text>{userSearched.firstName}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {userSearched.email}
                </Text>
            </Box>
        </Box>
    );
};
export default UserListItem