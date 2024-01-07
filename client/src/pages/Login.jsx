import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from "react";
import logo from '../assets/images/logo.png';
import { ChatState } from '../context/ChatProvider';




const Login = () => {

    const { setUserToken, setUser } = ChatState();

    //check if token and user data  is already stored
    const navigate = useNavigate();

    // let { user } = useContext(UserContext);
    // console.log("User Data Login:", user);

    useEffect(() => {
        const user = localStorage.getItem("userdata");
        // console.log(user);
        if (user) navigate("/dashboard");
    }, [navigate]);


    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data);
        try {
            const url = 'http://localhost:8000/api/login';
            const response = await axios.post(url, data);
            // console.log(response);
            localStorage.setItem('userdata', JSON.stringify(response));
            // console.log("Login setUser:", response);
            // console.log("Login setUserToken:", response.data.data);
            setUser(JSON.stringify(response));
            setUserToken(response.data.data);
            window.location = '/dashboard';
            console.log(response.data);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
            else {
                setError("An error occurred. Please try again later.");
            }
        }
    }


    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900 "
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder=' shoaibalisabir2525@gmail.com'
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={handleChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    placeholder=' ******************'
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={handleChange}
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {error && <div className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">{error}</div>}


                        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a> </a>
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Create New Account Now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
