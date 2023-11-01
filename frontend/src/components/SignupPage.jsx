import React from 'react';
import Card from 'react-bootstrap/Card';
import EmailSignup from './Signup/EmailSignup';
import GoogleSignup from './Signup/GoogleSignup';
import '../css/SignupPage.css'

export default function SignupPage() {
    return (
        <div className="signup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card style={{ width: '25%', marginTop: '50px' }}>
                <Card.Body>
                    <Card.Title style={{ paddingLeft: '1px', textAlign: 'start' }}>Sign up</Card.Title>
                    <EmailSignup />
                    <GoogleSignup />
                </Card.Body>
            </Card>
            
        </div>
    );
}