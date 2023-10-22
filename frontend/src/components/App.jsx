import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';

import '../css/App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App () {

  return (
    <div className='app-container'>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
}

