import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FirebaseContext from '../../contexts/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function EmailSignup() {
    const firebaseApp = useContext(FirebaseContext); // Firebase auth context

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailSignup = () => {
        const auth = getAuth(firebaseApp);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Email Signup Successful:', user);
        })
        .catch((error) => {
            console.error('Email Signup Error:', error);
        });
    };

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" checked={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleEmailSignup} style={{width: '100%'}}>
                    Signup
                </Button>
            </Form>
        </div>
    );
}
