import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserAuthContextProvider} from './Components/Context/DatabaseContextProvide'



ReactDOM.render(
   <Router>
     <UserAuthContextProvider> 
       
           <App />

      </UserAuthContextProvider>
    </Router>
   ,
  document.getElementById('root')
);

