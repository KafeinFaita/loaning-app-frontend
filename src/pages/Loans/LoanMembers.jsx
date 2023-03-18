import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import LoadingScreen from "../../components/LoadingScreen";
import Table from '../../components/Table';
// import Error from '../Error';

const LoanMembers = () => {
    const navigate = useNavigate();
    const { userHasPrivilege } = useContext(AuthContext);
    const [loans, setLoans] = useState(null);

    useEffect(() => {
        if (!userHasPrivilege('loans_allow_view_members')) {
            return navigate('/');
        }

        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/member`, { withCredentials: true });
                console.log('no error')
                setLoans(response.data);
            } catch (error) {
                throw error;
            }   
        }

        fetchData();
    }, [])

    const tableHeaders = ["Member's Name", "Application Date", "Loan Applied", "Status", "Action"];

    if (!loans) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Table 
                headers={tableHeaders}
                body={loans.map(loan => {
                    const link = <Link to={`../${loan.loanId}`} className="text-white bg-gray-700 p-1 text-xs mx-2">Details</Link>;
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

export default LoanMembers;