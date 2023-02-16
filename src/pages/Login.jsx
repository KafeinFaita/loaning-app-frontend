import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
// import { FaMoneyBill } from 'react-icons/fa';

const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-green-300">
            <form className="flex flex-col gap-5 items-center justify-center border border-gray-400 h-[500px]">
                <h1 className='text-4xl'>LOGIN</h1>
                <label htmlFor="email">
                    <AiOutlineMail className='inline-block mr-2'/>
                    <input type="email" name="email" id="email" placeholder="E-mail" />
                </label>

                <label htmlFor="password">
                    <AiOutlineLock className='inline-block mr-2'/>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </label>
                
                <input type="submit" value="Login" className="bg-blue-300 w-3/5"/>
            </form>
        </div>
    )
}

export default Login;