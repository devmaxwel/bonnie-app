import { createContext, useContext, useEffect, useState} from 'react'
import { authentication } from '../Config/dbFirebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from 'firebase/auth'


const userAuthContext = createContext();

export function UserAuthContextProvider({children}){

    const [user, setUser] = useState('');

    function signinUser(email, password){
        return signInWithEmailAndPassword(authentication, email, password);
    }

    function resetUserPassword(email){
        return sendPasswordResetEmail(authentication, email);
    }

    function signOutUser(){
        return signOut(authentication);
    }

    function resetUserPassword(email){
        return sendPasswordResetEmail(authentication, email);
    }

    useEffect(() => {
      const unsubscribe =   onAuthStateChanged(authentication, (currentUser) => {
            setUser(currentUser);
             
        });

        return () => {
            unsubscribe();
        }
    },[]);



    return <userAuthContext.Provider value={{resetUserPassword, signinUser, signOutUser, user}}>
                {children}
        </userAuthContext.Provider>
    
}

export function useUserAuthContext(){

    return useContext(userAuthContext);
}