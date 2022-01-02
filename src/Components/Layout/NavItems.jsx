import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserAuthContext } from '../Context/DatabaseContextProvide';
import { toast } from 'react-toastify';



const NavItems = () => {
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

    return (
        <div className='nav-link'>

           <Button onClick={ handleSignOut }>Sign Out</Button>
           
        </div>
    )
}

export default NavItems;
