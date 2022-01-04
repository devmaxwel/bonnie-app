import React, { useState,useEffect} from 'react';
import { Button,Alert , Form} from 'react-bootstrap';
import { useUserAuthContext } from '../Context/DatabaseContextProvide';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { realtime } from '../Config/dbFirebase';
import { remove , get, ref, push } from 'firebase/database';

const Home = () => {
   
  
    const [customers, setCustomers] = useState({});
    const [cname, setCname] = useState("")
    const [contact, setContact] = useState("")
    const [serial, setSerial] = useState("")
    const [device, setDevice] = useState("")
    const [served, setServed] = useState("")
    const [amountc, setAmountC] = useState("")
    const [amountp, setAmountP] = useState("")
    const [status, setStatus] = useState("")


    const [error, setError] = useState("");



    const { signOutUser, user } = useUserAuthContext();
    
    const navigate = useNavigate('');

    const handleSignOut = async ()=> {

        try {
            await signOutUser();
            navigate('/')
     
        } catch (err) {
            toast.error(err.message);  
        }

    }


function writeUserData(e) {
    e.preventDefault();
    

    push(ref(realtime, "customers/"), {Name:cname,Contact: contact,
                   Serial:serial,  Device: device, Served: served, 
                   AmountC:amountc, AmountP:amountp, 
                   Status:status }).then(() => {
                   toast.success("Data Saved Succefully");
      })
      .catch((err) => {
             setError(err.message);
      });
      
  };


  
  

     useEffect(() => {
            const readCustomerData= async()=> {

                await get(ref(realtime, "customers/")).then( (snapshot) => {
                    if(snapshot.exists()){
                        console.log(snapshot.val());
                       setCustomers({...snapshot.val()});

                    }else 

                    {
                        setCustomers({});
                    }
                })

                return () => {
                    setCustomers({});
                };

            };

            readCustomerData();
        },[]);


         const deleteRecord= async(id)=> {
             if (window.confirm(" Are you sure you want do delete customer")
               
            ){
                await remove(ref(realtime, `customers/${id}`), ({...customers})).then( () => {
                    toast.success("Data was deleted successfully")
                }).catch( (err) => {
                    setError(err.message);
                });
            }
            
         };

    return (

        <>
                <div>
                    <nav className="navbar navbar-light bg-light d-flex justify-content-center">
                    
                    <h3>Bonnie Electronics Management</h3>
                    <div className='nav-link'> 
                    <Button onClick={ handleSignOut }>Sign Out</Button>
                    </div>
                    <div>
                        <p>Welcome {user.email}</p>
                    </div>


                    </nav>
                  
                    
                </div>

                <section>
                <h1 className='text-primary' >Customer_Records</h1>
                <table class="table table-dark table-striped">
                    {error && <Alert>{error}</Alert>}
                   
               
                <thead>
               
                        <tr >
                                <th style={{ textAlign: "center" }}>Number</th>
                                <th style={{ textAlign: "center" }}>Client_Name</th>
                                <th style={{ textAlign: "center" }}>Phone_Number</th>
                                <th style={{ textAlign: "center" }}>Device_Serial</th>
                                <th style={{ textAlign: "center" }}>Device_Diagnostics</th>
                                <th style={{ textAlign: "center" }}>Served_By</th>
                                <th style={{ textAlign: "center" }}>Amount_Charged</th>
                                <th style={{ textAlign: "center" }}>Amount_Paid</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                                <th className='text-primary' style={{ textAlign: "center" }}>Actions</th>

                        </tr>
                </thead>

                 <tbody>

                     { Object.keys(customers).map((id,index) => {
                         return(

                        <tr key={id}>
                       
                            <th scope="row">{index+ 1}</th>

                                <td>{customers[id].Name}</td>
                                <td>{customers[id].Contact}</td>
                                <td>{customers[id].Serial}</td>
                                <th>{customers[id].Device}</th>
                                <td>{customers[id].Served}</td>
                                <td>{customers[id].AmountC}</td>
                                <td>{customers[id].AmountP}</td>
                                <td>{customers[id].Status}</td>
        
                                <td className='d-flex justify-content-space-between'>
                                    <Button style={{position:"inline"}}  
                                    variant='danger' 
                                    onClick={() => deleteRecord(id)}>Delete</Button>
                                
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
                  
                         <Form id='FormData' onSubmit={writeUserData} >

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
                                        placeholder="Payment Status"
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
