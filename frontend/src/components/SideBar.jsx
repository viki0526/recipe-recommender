import React, {useState, useEffect} from 'react';
import '../css/Filters.css';
import { Dropdown, FormControl} from 'react-bootstrap';

export default function SideBar () {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);

    // Ingredient Filter Functions --------------------------------

    const handleDropdownSelect = (e, selectedOption) => {
        e.preventDefault()
        if (!selectedTags.includes(selectedOption)) {
            setSelectedTags([...selectedTags, selectedOption]);
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
        setSelectedTags(updatedTags);
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        console.log(query);
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
            {selectedTags.map((tag) => (
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