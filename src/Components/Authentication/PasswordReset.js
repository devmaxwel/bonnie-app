import React, {useState} from 'react'
import {Alert, Form, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuthContext } from '../Context/DatabaseContextProvide';
import { toast } from 'react-toastify';

const PasswordReset = () => {
   const [email, setEmail] = useState();
   const { resetUserPassword} = useUserAuthContext();
   const navigate = useNavigate('')
   const [error, setError] = useState("")


    const handleResetPassword= async (e)=>{
        e.preventDefault();
        setError("")
      
            try {
                await resetUserPassword(email)
                setTimeout(() =>   navigate('/'), 10000)
                toast.success("Your Password Reset Link Was sent to Your Email if the email provided was Correct")
            

            } catch (err) {
                setError(err.message);
                setTimeout(() => navigate('/reset'), 10000);
                toast.error("The Email entered does not match any in our database, please provide the right email or contact support")
                
            }
         
      

    }



    return (
        <div>
            <div className="p-4 box">
            <h2 className="mb-3">Reset Your Password</h2>
             {error && <Alert variant='danger'>{error}</Alert>}
        

                    <Form onSubmit={handleResetPassword}  >

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                type="email"
                                placeholder="Email address"
                                onChange={(e) =>  setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-grid gap-2">
                        <Button variant="danger" type="Submit">
                        Reset Password
                        </Button>
                    </div>

                 </Form>
                 <hr />
                  
               
                <div className="p-4 box mt-3 text-center">
                   Remembered Your Password? <Link to="/">Login</Link>
                </div>

                </div> 
        </div>
    )
}

export default PasswordReset;
