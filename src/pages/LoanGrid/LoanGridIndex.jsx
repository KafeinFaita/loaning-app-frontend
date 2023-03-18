import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../../components/LoadingScreen";
import Table from '../../components/Table';

const LoanGridIndex = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-grid`, { withCredentials: true });
                setLoading(false);
                setData(response.data);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    const handleDelete = async e => {
    
        const loanGridId = e.target.getAttribute('grid_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/loan-grid/${loanGridId}`, { withCredentials: true });
            setData(prevData => prevData.filter(item => item.loanGridId !== loanGridId));
        } catch (error) {
            throw error
        }
    }

    const tableHeaders = ['Minimum Loan Amount', 'Max Loan Amount', 'Max Payment Term', 'Number of Co-Makers', 'Years of Residency', 'Fixed Deposit Factor', 'Processing Fee', 'Action'];

    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <div className='max-w-screen bg-yellow-200 overflow-scroll'>
            <Table 
                headers={tableHeaders}
                body={data.map(grid => {
                    const link = <button className="text-white bg-gray-700 p-1 text-xs" grid_id={grid.loanGridId} onClick={handleDelete}>Delete</button>;

                    return [
                        grid.minLoan,
                        grid.maxLoan,
                        grid.maxTerm,
                        grid.coMakers,
                        grid.yearsOfResidency,
                        grid.fixedDepositFactor,
                        grid.processingFee,
                        link
                    ]
                })}
            />
        </div>
    )
}   

export default LoanGridIndex;