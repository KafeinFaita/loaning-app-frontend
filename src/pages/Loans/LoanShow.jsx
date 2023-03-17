import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import FormSubmit from "../../components/FormSubmit";
import AuthContext from "../../contexts/AuthContext";

const LoanShow = () => {
    const [loan, setLoan] = useState(null);
    const { id } = useParams();
    const textAreaRef = useRef(null);
    const navigate = useNavigate();
    const { userHasPrivilege } = useContext(AuthContext);

    useEffect(() => {
        if (!userHasPrivilege('loans_allow_view')) {
            navigate('/')
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/loans/${id}`, { withCredentials: true });

                console.log(response)
                setLoan(response.data);
            } catch (error) {
                setLoan({});
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

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/loans/${id}`, {
                status: e.target.status.value,
                disapproveReason: e.target.status.value === 'Disapproved' ? e.target.disapproveReason.value : null
            }, { withCredentials: true });
            navigate('/dashboard/loans/members')
        } catch (error) {
            throw error;
        }
    }

    if (!loan) return <LoadingScreen />

    return( 
        <div>
            <h1>MEMBER LOAN DETAILS</h1>
            <p>Date of Loan Application: {loan.createdAt}</p>
            <p>Member's Name: {loan.user.lastName}, {loan.user.firstName} {loan.user.middleName}</p>
            <p>Loan to Apply: {loan.loanType.name}</p>
            <p>Loan Amount: {loan.loanAmount}</p>
            <p>Interest Rate Per Annum: {loan.loanType.interestRate}%</p>
            <p>Required Number of Co-Makers: {loan.grid.coMakers}</p>
            <p>Maximum Payment Terms (In Years): {loan.grid.maxTerm}</p>
            <p>Processing Fee: Php {loan.grid.processingFee}</p>

            <form className={`mt-20 ${userHasPrivilege('loans_allow_update_status') ? null : 'hidden'}`} onSubmit={handleSubmit}>
                <label htmlFor="status" className="block">
                    Loan Application Status:
                    <select name="status" id="status" className="block mb-10 border border-gray-400" onChange={handleChange} defaultValue={loan.status}>
                        <option value="Received">Received</option>
                        <option value="Processing">Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Disapproved">Disapproved</option>
                    </select>
                </label>

                <label htmlFor="disapproveReason" ref={textAreaRef} className="hidden">
                    Reason for Disapproval
                    <textarea name="disapproveReason" className="block w-56 border border-gray-400" ></textarea>
                </label>

                <FormSubmit value="Update Status" />
            </form>
            <Link to="edit" className='p-2 bg-gray-700 inline-block text-white mt-5'>Edit This Loan</Link>
        </div>

       
    )
}

export default LoanShow;