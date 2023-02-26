import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { BallTriangle } from  'react-loader-spinner';
import FormSubmit from '../components/FormSubmit';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // redirect user if already logged in
    useEffect(() => {
        const fetchData = async() => {
            try {
                const user = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth`, { withCredentials: true });
                if (!user.data.error) {
                    navigate('/dashboard');
                }
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, [])

    const handleLogin = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await axios.post(`${import.meta.env.VITE_API_URL}/api/`, {
                username: e.target.username.value,
                password: e.target.password.value
            }, {
                withCredentials: true
            });
            if (user.data.error) {
                setLoading(false);
                return setError(user.data.error);
            }
            setLoading(false);
            setAuthUser(user.data);
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClassName="w-96"
                    wrapperStyle=""
                    visible={true}
                />
            </div>
            
        )
    }
    return (
        <div className="flex justify-center items-center h-screen bg-yellow-50">
            <form className="flex flex-col gap-5 items-center justify-center px-16 py-28 rounded-md bg-white shadow-xl" onSubmit={handleLogin}>
                <h1 className='text-4xl mb-10 font-bold'>LOGIN</h1>
                <label htmlFor="username">
                    <AiOutlineMail className='inline-block mr-2'/>
                    <input type="text" name="username" id="email" placeholder="Username" className='border border-gray-400' />
                </label>

                <label htmlFor="password">
                    <AiOutlineLock className='inline-block mr-2'/>
                    <input type="password" name="password" id="password" placeholder="Password" className='border border-gray-400'/>
                </label>
                
                <input type="submit" value="Login" className="bg-blue-800 text-white py-1 w-full cursor-pointer"/>

                <p className={error ? "block italic text-red-600" : "hidden"}>Invalid username and/or password</p>
            </form>
        </div>
    )
}

export default Login;