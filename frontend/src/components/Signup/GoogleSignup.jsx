import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button'
import FirebaseContext from '../../contexts/FirebaseContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function GoogleSignup() {
    const firebaseApp = useContext(FirebaseContext); // Firebase auth context

    const handleGoogleSignup = () => {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('Google Signup Successful:', user);

        })
        .catch((error) => {
            console.error('Google Signup Error:', error);
        });
    };

    return (
        <div>
            <p style={{marginTop: '1rem'}}>or</p>
            <Button variant="outline-primary" onClick={handleGoogleSignup} style={{width: '100%'}}>Signup with Google</Button>
        </div>
    );
}