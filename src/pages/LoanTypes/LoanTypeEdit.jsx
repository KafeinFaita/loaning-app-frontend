import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormSubmit from '../../components/FormSubmit';
import LoadingScreen from '../../components/LoadingScreen';

const LoanTypeEdit = () => {
    const navigate = useNavigate();
    const [loanType, setLoanType] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types/${id}`, { withCredentials: true });
                setLoanType(response.data)
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/loan-types/${loanType.loanTypeId}`, {
                name: e.target.name.value,
                maxLoanAmount: e.target.maxLoanAmount.value,
                interestRate: e.target.interestRate.value
            }, { withCredentials: true })
            console.log(response)
            navigate(`/dashboard/loan-types/${loanType.loanTypeId}`);
        } catch (error) {
            throw error;
        }
    }

    if (!loanType) { 
        return <LoadingScreen />
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold">Create New Loan Type</h1>

            <div className="flex flex-col gap-5 mb-11">
                <label htmlFor="loanName">
                    Loan Type Name
                    <input type="text" name="name" id="loanName" className="border border-black block" defaultValue={loanType.name} />
                </label>

                <label htmlFor="maxLoanAmount">
                    Maximum Loanable Amount
                    <input type="number" name="maxLoanAmount" id="maxLoanAmount" className="border border-black block" defaultValue={loanType.maxLoanAmount} />
                </label>

                <label htmlFor="interestRate">
                    Interest Rate
                    <input type="number" name="interestRate" id="interestRate" className="border border-black block" min={0} max={100} defaultValue={loanType.interestRate} />
                </label>
            </div>
            
            {/* <input type="submit" value="Submit" className="p-2 bg-gray-800 text-white mt-5"/> */}
            <FormSubmit value="Submit Changes"/>

        </form>
    )
}

export default LoanTypeEdit;