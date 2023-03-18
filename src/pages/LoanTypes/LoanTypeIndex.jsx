import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import Table from '../../components/Table';

const LoanTypeIndex = () => {
    const [loanTypes, setLoanTypes] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types`, { withCredentials: true });
                console.log(response)
        
                setLoanTypes(response.data);
            } catch (error) {
                throw error
            }
        }

        fetchData();
    }, [])

    const handleDelete = async e => {
        e.preventDefault();
        
        const typeId = e.target.getAttribute('type_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/loan-types/${typeId}`, { withCredentials: true });
            setLoanTypes(prevLoanTypes => prevLoanTypes.filter(type => type.loanTypeId !== typeId));
        } catch (error) {
            throw error
        }
    }

    const tableHeaders = ['Loan Type Name', 'Maximum Loanable Amount', 'Interest Rate', 'Actions']

    if (!loanTypes) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Table 
                headers={tableHeaders}
                body={loanTypes.map(type => {
                    const links = <>
                        <Link to={type.loanTypeId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Full Details</Link>
                        <button className="text-white bg-gray-700 p-1 text-xs" type_id={type.loanTypeId} onClick={handleDelete}>Delete</button>
                    </>
                    return [
                        type.name,
                        `Php ${type.maxLoanAmount}`,
                        type.interestRate,
                        links
                    ]
                })}
            />

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