import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';

import ErrorPanel from '../ErrorPanel/ErrorPanel';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './SignUp.css';

const SignUp = () => {
    const history = useHistory();

    //State
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState({error: false, message: ''});


    //Handlers
    const handleUser = (event) => {
        return setUser(event.target.value);
    }

    const handleEmail = (event) => {
        return setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        return setPassword(event.target.value);
    }

    const handleSubmit = async () => {

        try {

            if (user.length === 0 || email.length === 0 || password.length === 0) {
                return setError({
                    error: true,
                    message: 'You must complete all fields in order to sign up.'
                })
            }
            
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user: user,
                    email: email,
                    password: password
                })
            })
    
            const parsedResponse = await response.json()
    
            if(response.status !== 200) {
                return setError({
                    error: true,
                    message: parsedResponse
                })
            } else {
                localStorage.setItem('id', parsedResponse.id);
                localStorage.setItem('user', parsedResponse.nick);
                return history.push('/');
            }
            
        } catch(error) {
            console.log('ERROR:', error);
            throw new Error();
        }
    }


    return(
        <Container className='center signup'>
            <Row>
                <Col sm={3}></Col>
                <Col sm={6}>
                    <h1 className='signup-title-box'><span className='signup-title rounded'>Sign Up</span></h1>
                    { error.error ? <ErrorPanel message={error.message} /> : null}
                    <Card className='signup-card'>
                        <form>
                            <label htmlFor="input-user" className="signup-subtitle">User</label>
                            <input 
                                className='form-input'
                                type="text" 
                                name='user'
                                value={user}
                                placeholder="User"
                                onChange={handleUser} 
                            ></input>

                            <label htmlFor="input-email" className="signup-subtitle">E-mail</label>
                            <input 
                                className='form-input'
                                type="email" 
                                name='email'
                                value={email}
                                placeholder="E-mail"
                                onChange={handleEmail} 
                            ></input>   

                            <label htmlFor="input-password" className="signup-subtitle">Password</label>
                            <input 
                                className='form-input'
                                name='password'
                                value={password}
                                type="password" 
                                placeholder="Password"
                                onChange={handlePassword} 
                            ></input> 

                            <Button 
                                className='mb-4 signup-button'
                                variant="secondary"
                                onClick={() => handleSubmit()}>
                                Sign Up
                            </Button>
            
                            <Link to='/signin'>I already have an account</Link>

                        </form>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>
    )
}

export default SignUp;