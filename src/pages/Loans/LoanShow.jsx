import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import FormSubmit from "../../components/FormSubmit";

const LoanShow = () => {
    const [loan, setLoan] = useState(null);
    const { id } = useParams();
    const textAreaRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/${id}`, { withCredentials: true });
                console.log(response.data)
                setLoan(response.data);
            } catch (error) {
                
            }
        }

        fetchData();
    }, [])

    const handleChange = (e) => {
        if (e.target.value === "Disapproved") {
            textAreaRef.current.classList.remove('hidden');
        } else {
            textAreaRef.current.classList.add('hidden');
        }

    }

    if (!loan) return <LoadingScreen />

    return( 
        <div>
            <p>Date of Loan Application: {loan.createdAtx}</p>
            <p>Member's Name: {loan.user.lastName}, {loan.user.firstName} {loan.user.middleName}</p>
            <p>Loan to Apply: {loan.loanType.name}</p>
            <p>Loan Amount: {loan.loanAmount}</p>
            <p>Interest Rate Per Annum: {loan.loanType.interestRate}%</p>
            <p>Required Number of Co-Makers: {loan.grid.coMakers}</p>
            <p>Maximum Payment Terms (In Years): {loan.grid.maxTerm}</p>
            <p>Processing Fee: Php {loan.grid.processingFee}</p>

            <form className="mt-20">
                <label htmlFor="status" className="block">
                    Loan Application Status:
                    <select name="status" id="status" className="block mb-10 border border-gray-400" onChange={handleChange}>
                        <option value="Received">Received</option>
                        <option value="Processing">Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Disapproved">Disapproved</option>
                    </select>
                </label>

                <label htmlFor="disapprovedReason" ref={textAreaRef} className="hidden">
                    Reason for Disapproval
                    <textarea className="block w-56 border border-gray-400"></textarea>
                </label>

                <FormSubmit value="Update Status" />
            </form>
        </div>

       
    )
}

export default LoanShow;