import axios from 'axios';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

const LoanTypeIndex = () => {
    const loanTypes = useLoaderData();
    const navigate = useNavigate();

    const handleDelete = async e => {
        e.preventDefault();
        
        const typeId = e.target.getAttribute('type_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/loan-types/${typeId}`, { withCredentials: true });
            navigate('/dashboard/loan-types', { replace: true });
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Loan Type Name</th>
                        <th>Maximum Loanable Amount</th>
                        <th>Interest Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {loanTypes.map(type => {
                        return (
                            <tr>  
                                <td>{type.name}</td>
                                <td>Php {type.maxLoanAmount}</td>
                                <td>{type.interestRate}%</td>
                                <td>
                                    <Link to={type.loanTypeId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Full Details</Link>
                                    <button className="text-white bg-gray-700 p-1 text-xs" type_id={type.loanTypeId} onClick={handleDelete}>Delete user</button>
                                </td>
                            </tr>
                        )      
                    })}
                </tbody>
            </table>

        </div>
    )
}

export const loanTypeIndexLoader = async () => {
    try {
        const loanTypes = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types`);
        return loanTypes.data;
    } catch (error) {
        throw error
    }
}

export default LoanTypeIndex;