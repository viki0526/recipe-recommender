import React, {useState, useEffect} from 'react';
import '../css/SelectIngredients.css';
import { Dropdown, FormControl } from 'react-bootstrap';

export default function SelectIngredients () {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([
        'milk',
        'butter',
        'rice',
        'milo',
        'buscuit',
        'molasses',
        'macadamia nuts'
    ]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get-ingredients')
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the Flask server
            setOptions(data);
            console.log(data)
        })
        .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
        });
    }, [])

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

    const filteredOptions = options.filter((option) =>
        option.trim().toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className='select-container'>
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    />
                    {filteredOptions.sort((a, b) => a.length - b.length).slice(0, 5).map((option) => (
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
    );
}

