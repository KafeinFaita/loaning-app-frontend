import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';
import Table from '../../components/Table';

const LoanIndex = () => {
    const [loans, setLoans] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans`, { withCredentials: true });
                console.log(response.data)
                setLoans(response.data);
            } catch (error) {
                throw error;
            }   
        }

        fetchData();
    }, [])

    const tableHeaders = ["Member's Name", "Application Date", "Loan Applied", "Status", "Action"]

    if (!loans) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Table 
                headers={tableHeaders}
                body={loans.map(loan => {
                    const link = <Link to={loan.loanId} className="text-white bg-gray-700 p-1 text-xs mx-2">Details</Link>;

                    return [
                        `${loan.user.lastName}, ${loan.user.firstName} ${loan.user.middleName}`,
                        loan.createdAt,
                        loan.loanType.name,
                        loan.status,
                        link
                    ]
                })}
            />
        </div>
    )
}

export default LoanIndex;