import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoanGridCreate = () => {
    const navigate = useNavigate();
    const loanGrid = [
        { nameId: "minLoan", description: "Minimum Loan Amount" },
        { nameId: "maxLoan", description: "Maximum Loan Amount" },
        { nameId: "maxTerm", description: "Max Payment Term (in years)" },
        { nameId: "coMakers", description: "Number of Co-Makers" },
        { nameId: "yearsOfResidency", description: "Years of Residency" },
        { nameId: "fixedDepositFactor", description: "Fixed Deposit Factor (percentage)", min: 1, max: 100 },
        { nameId: "processingFee", description: "Processing Fee" },
    ]

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/loan-grid`, {
                minLoan: e.target.minLoan.value,
                maxLoan: e.target.maxLoan.value,
                maxTerm: e.target.maxTerm.value,
                coMakers: e.target.coMakers.value,
                yearsOfResidency: e.target.yearsOfResidency.value,
                fixedDepositFactor: e.target.fixedDepositFactor.value,
                processingFee: e.target.processingFee.value
            }, { withCredentials: true })
            console.log(response.data)
            navigate('/dashboard/loan-grid');
        } catch (error) {
            throw error;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>CREATE NEW LOAN GRID</h1>

            <div className="flex flex-col gap-7">
                {loanGrid.map(grid => {
                    return (
                        <label htmlFor={grid.nameId}>
                            {grid.description}
                            <input type="number" name={grid.nameId} id={grid.nameId} className="block border border-black" min={grid.min ? grid.min : null}
                            max={grid.max ? grid.max : null}/>
                        </label>
                    )
                })}

                <input type="submit" value="Submit" className="bg-gray-800 text-white p-2 w-20" />
            </div>
        </form>
    )
}

export default LoanGridCreate;