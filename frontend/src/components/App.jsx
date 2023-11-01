import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';

import '../css/App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavComponent from './NavComponent'
import RecipeDetails from './RecipeDetails'
import SignupPage from './SignupPage'


export default function App () {

  return (
    <>
      <NavComponent />
      <div className='app-container'>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/details/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </>
    
  );
}

