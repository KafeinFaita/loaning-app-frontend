import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';
import FormSubmit from '../../components/FormSubmit';

const LoanCreate = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState(null);
    const [users, setUsers] = useState(null)
    const [loanTypes, setLoanTypes] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [loanData, setLoanData] = useState(null);
    const [coMakers, setCoMakers] = useState([]);
    const [amountError, setAmountError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const grid = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-grid`, { withCredentials: true });
                const users = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, { withCredentials: true });
                const loanTypes = await axios.get(`${import.meta.env.VITE_API_URL}/api/loan-types`, { withCredentials: true });

                console.log(users.data)

                setGrid(grid.data);
                setUsers(users.data.map(user => {
                    return { value: user._id, label: `${user.lastName}, ${user.firstName} ${user.middleName} (${user.username})` }
                }));
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
        console.log(selectedType)
        if (!selectedType) {
            console.log('no selected type')
            return;
        }

        if (e.target.value > selectedType.maxLoanAmount) {
            
            return setAmountError(true);
        }
       setAmountError(false);
    }

    const handleComaker = (selectedUsers) => {
        console.log(selectedUsers)
        setCoMakers(selectedUsers.map(user => user.value))
    }   

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(coMakers)
        // if (amountError) {
        //     return;
        // }
        
        // try {
            
        //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/loans`, {
        //         loanAmount: e.target.loanAmount.value,
        //         loanType: e.target.loanType.value,
        //         grid: loanData._id
        //     }, { withCredentials: true })
        //     console.log(response.data)
        //     navigate('/dashboard/loans');
        // } catch (error) {
        //     throw error;
        // }
        
    }

    if (!loanTypes) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-7 mb-10'>
                <label htmlFor="loanType">
                    Loan to Apply 
                    <select name="loanType" id="loanType" onChange={handleTypeChange} className="block border-2" required>
                        <option selected disabled value=''>Select a loan type</option>
                        {loanTypes.map(type => <option value={type._id}>{type.name}</option>)}
                    </select>
                </label>

                <label htmlFor="loanAmount">
                    Loan Amount
                    <input type="number" name="loanAmount" id="loanAmount" onChange={handleLoanChange} className="block border-2" required/>
                    <p className='text-red-500 italic'>{amountError ? 'Value should not exceed the max loanable amount' : null}</p>
                </label>

                <div>
                    <p>Co-Makers {loanData ? `(Select ${loanData.coMakers})` : null}</p>
                    <Select 
                        options={loanData && coMakers.length >= loanData.coMakers ? [] : users} 
                        isMulti 
                        onChange={handleComaker} 
                        isDisabled={loanData ? false : true}
                    />
                </div>
                

                <p>Maximum Loanable Amount: {selectedType ? selectedType.maxLoanAmount : null}</p>
                <p>%Interest Rate Per Annum: {selectedType ? selectedType.interestRate : null}</p>
                <p>Required Number of Co-Makers: {loanData ? loanData.coMakers : null}</p>
                <p>Maximum Payment Terms: {loanData ? loanData.maxTerm : 0} year/s</p>
                <p>Processing Fee: Php {loanData ? loanData.processingFee : 0}</p>
            </div>
            

            

            <FormSubmit value="Submit Loan" />
        </form>
    )
}

export default LoanCreate;