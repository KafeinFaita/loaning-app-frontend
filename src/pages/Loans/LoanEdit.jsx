import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';
import FormSubmit from '../../components/FormSubmit';
import AuthContext from '../../contexts/AuthContext';

const RoleEdit = () => {
    const navigate = useNavigate();
    const { userHasPrivilege } = useContext(AuthContext);
    const { id } = useParams();
    const [loan, setLoan] = useState(null)
    const [grid, setGrid] = useState(null);
    const [loanTypes, setLoanTypes] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [loanData, setLoanData] = useState(null);

    useEffect(() => {
        if(!userHasPrivilege('loans_allow_edit')) {
            navigate('/');
        }

        const fetchData = async() => {
            try {
                const loan = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/${id}`);
                const gridData = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-grid`);
                const loanTypes = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types`);

                setLoan(loan.data);
                setGrid(gridData.data);
                setLoanTypes(loanTypes.data);
                setSelectedType(loan.data.loanType);
                setLoanData(loan.data.grid);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    const handleTypeChange = e => {
        setSelectedType(loanTypes.find(type => e.target.value === type._id));
    }

    const handleLoanChange = e => {
        setLoanData(grid.find(data => e.target.value <= data.maxLoan));
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/loans/${id}`, {
                loanAmount: e.target.loanAmount.value,
                loanType: e.target.loanType.value,
                grid: loanData._id
            }, { withCredentials: true })
            console.log(response.data)
            navigate('/dashboard/loans');
        } catch (error) {
            throw error;
        }
        
    }

    if (!loan) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-7 mb-10'>
                <label htmlFor="loanType">
                    Loan to Apply 
                    <select name="loanType" id="loanType" onChange={handleTypeChange} className="block border-2" defaultValue={loan.loanType._id} required>
                        <option selected disabled value=''>Select a loan type</option>
                        {loanTypes.map(type => <option value={type._id}>{type.name}</option>)}
                    </select>
                </label>

                <label htmlFor="loanAmount">
                    Loan Amount
                    <input type="number" name="loanAmount" id="loanAmount" onChange={handleLoanChange} className="block border-2" defaultValue={loan.loanAmount} required/>
                </label>

                <p>Maximum Loanable Amount: {selectedType ? selectedType.maxLoanAmount : null}</p>
                <p>%Interest Rate Per Annum: {selectedType ? selectedType.interestRate : null}</p>
                <p>Required Number of Co-Makers: {loanData ? loanData.coMakers : null}</p>
                <p>Maximum Payment Terms: {loanData ? loanData.maxTerm : 0} year/s</p>
                <p>Processing Fee: Php {loanData ? loanData.processingFee : 0}</p>
            </div>
            <FormSubmit value="Update Loan" />
        </form>
    )
}

export default RoleEdit;