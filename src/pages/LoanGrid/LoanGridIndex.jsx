import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingScreen from "../../components/LoadingScreen";

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

    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <div className='max-w-screen bg-yellow-200 overflow-scroll'>
            <table className='border border-collapse border-slate-500'>
                <thead>
                    <tr>
                        <th className='border border-slate-800'>Minimum Loan Amount</th>
                        <th className='border border-slate-800'>Max Loan Amount</th>
                        <th className='border border-slate-800'>Max Payment Term</th>
                        <th className='border border-slate-800'>Number of Co-Makers</th>
                        <th className='border border-slate-800'>Years of Residency</th>
                        <th className='border border-slate-800'>Fixed Deposit Factor</th>
                        <th className='border border-slate-800'>Processing Fee</th>
                        <th className='border border-slate-800'>Action</th>
                    </tr>
                </thead>
                <tbody>
            {data.map(grid => {
                return (
                    <tr className='border border-slate-800'>
                        <td className='border border-slate-800 px-2'>{grid.minLoan}</td>
                        <td className='border border-slate-800 px-2'>{grid.maxLoan}</td>
                        <td className='border border-slate-800 px-2'>{grid.maxTerm}</td>
                        <td className='border border-slate-800 px-2'>{grid.coMakers}</td>
                        <td className='border border-slate-800 px-2'>{grid.yearsOfResidency}</td>
                        <td className='border border-slate-800 px-2'>{grid.fixedDepositFactor}</td>
                        <td className='border border-slate-800 px-2'>{grid.processingFee}</td>
                        <td className='border border-slate-800 px-2'>
                            <button className="text-white bg-gray-700 p-1 text-xs" grid_id={grid.loanGridId} onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                )
            })}
                </tbody>
            </table>
        </div>
    )
}   

export default LoanGridIndex;