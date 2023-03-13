import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';

const LoanTypeShow = () => {
    // const loanType = useLoaderData()
    const [loanType, setLoanType] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types/${id}`, { withCredentials: true });
                console.log(response)
        
                setLoanType(response.data);
            } catch (error) {
                throw error
            }
        }

        fetchData();
    }, [])

    if (!loanType) {
        return <LoadingScreen />
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>{loanType.name}</h1>
            <p>Maximum Loanable Amount: Php {loanType.maxLoanAmount}</p>
            <p>Interest Rate: {loanType.interestRate}%</p>
            <p>Date Created: {new Date(loanType.createdAt).toLocaleString()}</p>

            <Link to="edit" className='p-2 bg-gray-700 inline-block text-white mt-5'>Edit This Loan Type</Link>
        </div>
    )
}

export const loanTypeShowLoader = async ({ params }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types/${params.id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default LoanTypeShow;