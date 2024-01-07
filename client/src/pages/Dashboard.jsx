import Header from "../components/Header";
import ShowingChatUsers from "../components/ShowingChatUsers";
import CurrentChatBox from "../components/CurrentChatBox";
import { ChatState } from '../context/ChatProvider';

const Dashboard = () => {

    const { user, userToken } = ChatState();

    // console.log("user:", user);


    // const userInfoLocalStorage = JSON.parse(localStorage.getItem("userdata"));
    // console.log(userInfoLocalStorage);

    return (
        <>
            <Header></Header>
            <div className="flex flex-row">
                <div className="w-1/3">
                    <ShowingChatUsers></ShowingChatUsers>
                </div>
                <div className="w-2/3">
                    <CurrentChatBox></CurrentChatBox>
                </div>
            </div>


            {/* <Button colorScheme='blue'>Button</Button>
            <Button colorScheme='red' onClick={handleLogout}>Logout</Button> */}
        </>

    )
}

export default Dashboard