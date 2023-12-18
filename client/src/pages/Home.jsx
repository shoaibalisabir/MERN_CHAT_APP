import React from 'react'

const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <>
            <h1>Hello World</h1>
            <button onClick={handleLogout}>Logout</button>
        </>

    )
}

export default Home