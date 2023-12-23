
const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location = '/';

    };

    return (
        <>
            <h1>Hello World</h1>
            <button onClick={handleLogout}>Logout</button>
        </>

    )
}

export default Home