import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';

const LoanCreate = () => {
    const [grid, setGrid] = useState(null);
    const [loanTypes, setLoanTypes] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [loanData, setLoanData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const grid = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-grid`);
                const loanTypes = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types`);

                console.log(grid.data)

                setGrid(grid.data);
                setLoanTypes(loanTypes.data);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    const handleTypeChange = e => {
        console.log(e.target.value)
        setSelectedType(loanTypes.find(type => e.target.value === type._id))
    }

    const handleLoanChange = e => {
        setLoanData(grid.find(data => e.target.value <= data.maxLoan));
    }

    if (!loanTypes) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <form className='flex flex-col gap-4'>
            <label htmlFor="loanType">
                Loan to Apply 
                <select name="loanType" id="loanType" onChange={handleTypeChange} className="block border-2">
                    {loanTypes.map(type => <option value={type._id}>{type.name}</option>)}
                </select>
            </label>

            <label htmlFor="loanAmount">
                Loan Amount
                <input type="number" name="loanAmount" id="loanAmount" onChange={handleLoanChange} className="block border-2" />
            </label>

            <p>Maximum Loanable Amount: {selectedType ? selectedType.maxLoanAmount : null}</p>
            <p>%Interest Rate Per Annum: {selectedType ? selectedType.interestRate : null}</p>
            <p>Required Number of Co-Makers: {loanData ? loanData.coMakers : null}</p>
            <p>Maximum Payment Terms: {loanData ? loanData.maxTerm : null} year/s</p>
            <p>Processing Fee: Php {loanData ? loanData.processingFee : null}</p>
        </form>
    )
}

export default LoanCreate;