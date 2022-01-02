import React,{useState} from 'react'
import {Form, Alert, Button} from 'react-bootstrap'
import GoogleButton from 'react-google-button';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuthContext } from '../Context/DatabaseContextProvide';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signinUser} = useUserAuthContext();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await signinUser(email, password)
            navigate('/home')
            
        } catch (err) {
            setError(err.message); 
        }
       
      };
    
     
    return (
        <>
            <div className="p-4 box">
            <h2 className="mb-3">Login to Bonnie System</h2>
            {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}  >

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                        Log In
                        </Button>
                    </div>
                    </Form>
                    <hr />
                    <div>

                    <GoogleButton
                        className="g-btn"
                        type="dark"
                        
                    />
                    </div>
                </div>
                <div className="p-4 box mt-3 text-center">
                    Forgot Password? <Link to="/reset">Reset</Link>
                </div>
        
        </>
    )
}

export default SignIn;
