import React, { useState,useEffect} from 'react';
import { Button,Alert , Form} from 'react-bootstrap';
import { useUserAuthContext } from '../Context/DatabaseContextProvide';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { database } from '../Config/dbFirebase';
import { collection, addDoc , getDocs} from 'firebase/firestore';

const Home = () => {
   
  
    const [customers, setCustomers] = useState([]);
    const [cname, setCname] = useState("")
    const [contact, setContact] = useState("")
    const [serial, setSerial] = useState("")
    const [device, setDevice] = useState("")
    const [served, setServed] = useState("")
    const [amountc, setAmountC] = useState("")
    const [amountp, setAmountP] = useState("")
    const [status, setStatus] = useState("")


    const [error, setError] = useState("");


    


    const {signOutUser} = useUserAuthContext();
    
    const navigate = useNavigate('');

    const handleSignOut = async ()=> {

        try {
            await signOutUser();
            navigate('/')
     
        } catch (err) {
            toast.error(err.message);  
        }

    }

    const customersCollectionRef = collection(database, "customers");

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        setError("")

        if(!cname || !contact || !serial || !device || !amountc || !amountp || !status || !served ){
            toast.error("Please Provide Data in each Field")
        }
        else{

            try {
           
                await addDoc(customersCollectionRef, {Name:cname,Contact: contact,
                Serial:serial,  Device: device, Served: served, AmountC:amountc, AmountP:amountp, Status:status });
                toast.success("Data was Save successfully")
                
            } catch (err) {
              setError(err.message);
            }
    

        }

       

    }

    useEffect(() => {

        const readCustomersData= async() =>{
            const data = await getDocs(customersCollectionRef);
            setCustomers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id})));
            console.log(data.size);

        }

        readCustomersData();
    },[customersCollectionRef]);

   
    

    return (

        <>
                <div>
                    <nav className="navbar navbar-light bg-light d-flex justify-content-center">
                    
                    <h3>Bonnie Electronics Management</h3>
                    <div className='nav-link'> 
                    <Button onClick={ handleSignOut }>Sign Out</Button>
                    </div>


                    </nav>
                  
                    
                </div>

                <section>
                <h1 className='text-primary' >Customer_Records</h1>
                <table class="table table-dark table-striped">
               
                <thead>
                        <tr >
                                <th scope="col">Number</th>
                                <th scope="col">Client_Name</th>
                                <th scope="col">Phone_Number</th>
                                <th scope="col">Device_Serial</th>
                                <th scope="col">Device_Diagnostics</th>
                                <th scope="col">Served_By</th>
                                <th scope="col">Amount_Charged</th>
                                <th scope="col">Amount_Paid</th>
                                <th scope="col">Status</th>
                                <th className='text-primary' scope="col">Actions</th>

                        </tr>
                </thead>

                 <tbody>

                 {  customers.map(( value, index) => { 
                      return( 

                    <tr key={index.id}>
                       
                        <th scope="row">{index+1}</th>
                        <td>{value.cname}</td>
                        <td>{value.contact}</td>
                        <td>{value.serial}</td>
                        <th>{value.sserved}</th>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>

                        <td className='p-2 d-flex justify-content-space-between'>
                            <Button variant='success'>Update</Button> <Button variant='danger'>Delete</Button>
                           
                        </td>
                    </tr>


                      )
                  })}

                       
                        
                       
                </tbody>

               </table> 
                </section>

                <section>
                <div className="p-4 box">
                    <h2 className="mb-3">Record Customer Details</h2>
                    { error && <Alert variant='danger'>{ error }</Alert>}
                  

                            <Form id='FormData' onSubmit={handleFormSubmit} >

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                        type="text"
                                        placeholder="Clients_Name"
                                        onChange={(e) => setCname(e.target.value)}
                                        required
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control
                                        type="text"
                                        placeholder="Phone_Number"
                                        onChange={(e) => setContact(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                        type="text"
                                        placeholder="Device_Serial"
                                        onChange={(e) => setSerial(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control
                                        type="text"
                                        placeholder="Device_Diagnostics"
                                        onChange={(e) => setDevice(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                        type="text"
                                        placeholder="Served_By"
                                        onChange={(e) => setServed(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control
                                        type="text"
                                        placeholder="Amount_Charged"
                                        onChange={(e) => setAmountC(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control
                                        type="text"
                                        placeholder="Amount_Paid"
                                        onChange={(e) => setAmountP(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Control
                                        type="text"
                                        placeholder="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                        />
                                    </Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" type="Submit">
                                    Save Record
                                </Button>
                            </div>
                            </Form>
                            <hr />
                 
                </div>

                

                </section>

        
          </>  
    )
}

export default Home;
