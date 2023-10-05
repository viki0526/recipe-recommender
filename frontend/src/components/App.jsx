import React, {useState, useEffect} from 'react';

import '../css/App.css';
import SelectIngredients from './SelectIngredients';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function App () {

  return (
    <div className='app-container'>
      <SelectIngredients />
    </div>
  );
}

