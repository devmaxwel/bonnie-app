import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer} from 'react-toastify'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { Container, Col, Row} from 'react-bootstrap'
import Home from './Components/Home/Home'
import SignIn from './Components/Authentication/SignIn'
import PasswordReset from './Components/Authentication/PasswordReset'


function App() {
  return (
    <div className="App">
      
       <ToastContainer />
        
          <Container>
               <Row>
                  <Col>
                   <Routes>
                          <Route path='/home' element={<Home />  } />
                          <Route path='/' element={ <SignIn /> } />
                          <Route path='/reset' element={ <PasswordReset /> } />
                    </Routes>
                  </Col>
               </Row>
          </Container>

            
      
 
    </div>
  );
}

export default App;
