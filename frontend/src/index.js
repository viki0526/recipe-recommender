import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components//App.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

import { initializeApp } from "firebase/app";
import FirebaseContext from './contexts/FirebaseContext'; 

const firebaseConfig = {
    apiKey: "AIzaSyDC2mTwgLtDsZIJNi-F1z5MOIqaJqfZzRE",
    authDomain: "recipe-recommender-82ef7.firebaseapp.com",
    projectId: "recipe-recommender-82ef7",
    storageBucket: "recipe-recommender-82ef7.appspot.com",
    messagingSenderId: "355330814910",
    appId: "1:355330814910:web:bc554f42fb7cbebfd4ffef",
    measurementId: "G-X6VDRRS69H"
};
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

