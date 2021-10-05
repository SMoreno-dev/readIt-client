import React, { useState } from 'react';
import { useHistory , Link } from 'react-router-dom';

import ErrorPanel from '../ErrorPanel/ErrorPanel';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './SignIn.css';


const SignIn = () => {
    const history = useHistory();

    //State
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({error: false, message: ''});

    //Handlers
    const handleUser = (event) => {
        return setUser(event.target.value);
    }

    const handlePassword = (event) => {
        return setPassword(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            if (user.length === 0 || password.length === 0) {
                return setError({
                    error: true,
                    message: 'You must complete all fields in order to sign in.'
                })
            }
            
            const response = await fetch('https://readit-server-1.herokuapp.com/auth/signin', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user: user,
                    password: password
                })
            })
    
            const parsedResponse = await response.json()

            if(response.status !== 200) {
                return setError({error: true, message: parsedResponse.message});

            } else {
                localStorage.setItem('id', parsedResponse.id);
                localStorage.setItem('user', parsedResponse.nick);
                history.push('/');
            }
            
        } catch(error) {
            console.log('ERROR:', error);
            throw error;
        }
    }

    return(
        <Container className='center signin'>
            <Row>
                <Col sm={3}></Col>

                <Col sm={6}>
                    { error.error ? <ErrorPanel message={error.message} /> : null}

                    <h1 className='signin-title-box'><span className='signin-title rounded'>Sign In</span></h1>
                    <Card className='signin-card'>
                        <form>
                            <label htmlFor="input-user" className="signin-subtitle">User</label>
                            <input 
                                className='form-input'
                                type="text" 
                                name='user'
                                value={user}
                                placeholder="User"
                                onChange={handleUser} 
                            ></input>

                            <label htmlFor="input-password" className="signin-subtitle">Password</label>
                            <input 
                                className='form-input'
                                name='password'
                                value={password}
                                type="password" 
                                placeholder="Password"
                                onChange={handlePassword} 
                            ></input> 

                            <Button 
                                className='mb-4 signin-button'
                                variant="secondary"
                                onClick={() => handleSubmit()}>
                                Sign In
                            </Button>

                            <Link to='/reddit-clone-client/signup'>I don't have an account</Link>

                        </form>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </Container>
    )
}

export default SignIn;