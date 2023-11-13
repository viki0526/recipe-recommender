import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components//App.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

import { initializeApp } from "firebase/app";
import FirebaseContext from './contexts/FirebaseContext'; 

const settings = require('./settings.json');

const firebaseConfig = settings.firebase_settings;
export const firebaseApp = initializeApp(firebaseConfig);

import 'firebase/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <FirebaseContext.Provider value={firebaseApp}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </FirebaseContext.Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

