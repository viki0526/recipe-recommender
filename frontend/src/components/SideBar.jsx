import React, {useState, useEffect} from 'react';
import '../css/Filters.css';
import { Dropdown, FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredientFilters } from '../reducers/ingredientFilters';

import {persistor} from '../store'

export default function SideBar () {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);

    const dispatch = useDispatch();
    const ingredientFilters = useSelector((state) => state.ingredientFilters);

    // Ingredient Filter Functions --------------------------------

    const handleDropdownSelect = (e, selectedOption) => {
        e.preventDefault()
        if (!ingredientFilters.includes(selectedOption)) {
            const updatedTags = [...ingredientFilters, selectedOption]
            dispatch(setIngredientFilters(updatedTags));
            persistor.flush().then(() => {
                console.log('Updated local store')
            }); //Save to localStorage
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const updatedTags = ingredientFilters.filter((tag) => tag !== tagToRemove);
        dispatch(setIngredientFilters(updatedTags));
        persistor.flush().then(() => {
            console.log('Updated to local store')
        }); //Save to localStorage
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        fetch('http://127.0.0.1:5000/search-ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchQuery: query }),
        })
        .then((response) => response.json())
        .then((data) => {
            setOptions(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='sidebar-container'>
            <div>
            {ingredientFilters.map((tag) => (
                <span key={tag} className="tag">
                {tag}
                <button
                    className="tag-remove"
                    onClick={() => handleTagRemove(tag)}
                >
                    X
                </button>
                </span>
            ))}
            </div>
            <Dropdown autoClose={false}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select Ingredients
            </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <FormControl
                    style={{margin: '0 10px', width: 'fit-content'}}
                    autoFocus
                    placeholder="Search..."
                    name="searchQuery"
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                    />
                    {options.map((option) => (
                    <Dropdown.Item
                        key={option}
                        onClick={(e) => handleDropdownSelect(e, option)}
                    >
                        {option}
                    </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}