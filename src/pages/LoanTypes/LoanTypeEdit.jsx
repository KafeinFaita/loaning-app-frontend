import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';

const LoanTypeEdit = () => {
    const navigate = useNavigate();
    const loanType = useLoaderData();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/loan-types/${loanType.loanTypeId}`, {
                name: e.target.name.value,
                maxLoanAmount: e.target.maxLoanAmount.value,
                interestRate: e.target.interestRate.value
            })
            console.log(response)
            navigate(`/dashboard/loan-types/${loanType.loanTypeId}`);
        } catch (error) {
            throw error;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold">Create New Loan Type</h1>

            <div className="flex flex-col gap-5">
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
            
            <input type="submit" value="Submit" className="p-2 bg-gray-800 text-white mt-5"/>

        </form>
    )
}

export default LoanTypeEdit;