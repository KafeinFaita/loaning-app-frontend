import { FaMoneyBillWave, FaUsers, FaUserClock } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

const Home = () => {
    return (
        <div className="p-10">
            <h1 className='text-3xl font-extrabold pb-10'>HOME</h1>

            <div className='flex flex-wrap gap-10 justify-center'>
                <div className=' bg-orange-300 flex gap-7 justify-between items-center p-8 w-full max-w-sm hover:bg-orange-400'>
                    <div>
                        <h2 className='font-bold text-2xl'>Php 0</h2>
                        <p>Payments Today</p>
                    </div>
                    <FaMoneyBillWave size={90} className=''/>
                </div>

                <div className=' bg-green-300 flex gap-7 justify-between items-center p-8 w-full max-w-sm hover:bg-green-400'>
                    <div>
                        <h2 className='font-bold text-2xl'>2</h2>
                        <p>Members</p>
                    </div>
                    <FaUsers size={90} className=''/>
                </div>

                <div className=' bg-yellow-300 flex gap-7 justify-between items-center p-8 w-full max-w-sm hover:bg-yellow-400'>
                    <div>
                        <h2 className='font-bold text-2xl'>5</h2>
                        <p>Active Loans</p>
                    </div>
                    <FaUserClock size={90} className=''/>
                </div>

                <div className=' bg-purple-300 flex gap-7 justify-between items-center p-8 w-full max-w-sm hover:bg-purple-400'>
                    <div>
                        <h2 className='font-bold text-2xl'>2</h2>
                        <p>Total Receivable</p>
                    </div>
                    <GiReceiveMoney size={90} className=''/>
                </div>
            </div>
        </div>
    )
}

export default Home;