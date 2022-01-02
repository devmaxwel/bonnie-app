import React from 'react'
import { useUserAuthContext } from '../Context/DatabaseContextProvide';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user} = useUserAuthContext();
    const navigate= Navigate();

    if(!user){
        return <Navigate to='/signin' />
    }
  return  children
       
};

export default PrivateRoute;
