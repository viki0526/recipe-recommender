import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import SideBar from './SideBar';
import { Dropdown, FormControl, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {useSearchParams} from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function Home () {
    // Component states
    const [recipeSearchTerm, setRecipeSearchTerm] = useState('');
    const [recipeOptions, setRecipeOptions] = useState([]);
    const [recipeResults, setRecipeResults] = useState([]);

    // Access URl parameters
    const [searchParams, setSearchParams] = useSearchParams();

    // Access redux state
    const ingredientFilters = useSelector((state) => state.ingredientFilters);

    const removeExtraWhitespace = (inputString) => {
        const cleanedString = inputString.replace(/\s+/g, ' ').trim();
        return cleanedString;
    }

    const removeNonAlpha = (inputString) => {
        const cleanedString = inputString.replace(/[^a-zA-Z ]/g, '');
        return cleanedString;
    }

    useEffect(() => {
        var query = searchParams.get("recipeSearchQuery");
        console.log(ingredientFilters)

        if (!query || query.length == 0) {
            return;
        }
        setRecipeSearchTerm(query);
        query = removeExtraWhitespace(removeNonAlpha(query));
        fetch('http://127.0.0.1:5000/recipe-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeSearchQuery: query, ingredientFilters: ingredientFilters}),
        })
        .then((response) => response.json())
        .then((data) => {
            setRecipeResults(data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [searchParams, setSearchParams, ingredientFilters]);

    // Recipe Search Functions --------------------------------

    const handleRecipeAutoComplete = (query) => {
        setRecipeSearchTerm(query);
    }

    const handleRecipeSearch = (key, searchTerm) => {
        console.log('recipe search')
        // Handle search for recipes
    }

    return (
        <div className='home-container'>
            <Container fluid>
                <Row>
                    <Col>
                        <SideBar />
                    </Col>
                    <Col xs={9}>
                        <Form>
                            <Form.Group className="mb-3 flex recipe-search" controlId="recipeSearch">
                                <FormControl
                                    style={{margin: '0 10px', width: 'fit-content'}}
                                    autoFocus
                                    placeholder="Search for a Recipe..."
                                    name="recipeSearchQuery"
                                    onChange={(e) => handleRecipeAutoComplete(e.target.value)}
                                    value={recipeSearchTerm}
                                />
                            </Form.Group>
                                {recipeOptions.map((option) => (
                                    <Dropdown.Item
                                        key={option}
                                        onClick={(e) => handleRecipeSearch(e, option)}
                                    >
                                        {option}
                                    </Dropdown.Item>
                                ))}
                        </Form>
                        {recipeResults.map((result) => (
                            <Card key={result.id} id={result.id} style={{margin: '25px 0px'}}>
                                <Card.Body>
                                    <Card.Title>{result.name}</Card.Title>
                                    <Card.Text>
                                        <b>Ingredients:</b> {result.ingredient_names.join(', ')}
                                    </Card.Text>
                                        <Button href={`/details/${result.id}`} variant="primary">View Recipe Details</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

