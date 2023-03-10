import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
// import Error from '../Error';

const LoanIndex = () => {

    const [loans, setLoans] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans`, { withCredentials: true });
                console.log('no error')
                setLoans(response.data);
            } catch (error) {
                throw error;
            }   
        }

        fetchData();
    }, [])

    if (!loans) {
        return <LoadingScreen />
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Member's Name</th>
                        <th>Application Date</th>
                        <th>Loan Applied</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {loans.map(loan => {
                    return (
                        <tr>
                            <td>{loan.user.lastName}, {loan.user.firstName} {loan.user.middleName}</td>
                            <td>{loan.createdAt}</td>
                            <td>{loan.loanType.name}</td>
                            <td>{loan.status}</td>
                            <td>
                                <Link to={loan.loanId} className="text-white bg-gray-700 p-1 text-xs mx-2">Details</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default LoanIndex;