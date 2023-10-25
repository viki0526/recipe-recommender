import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import SideBar from './SideBar';
import { Dropdown, FormControl, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {useSearchParams} from 'react-router-dom'

export default function Home () {
    const [recipeSearchTerm, setRecipeSearchTerm] = useState('');
    const [recipeOptions, setRecipeOptions] = useState([]);
    const [recipeResults, setRecipeResults] = useState([]);
    const [recipeSearchTokens, setRecipeSearchTokens] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

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
        if (!query || query.length == 0) {
            return;
        }
        query = removeExtraWhitespace(removeNonAlpha(query));
        console.log(query)
        fetch('http://127.0.0.1:5000/recipe-search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeSearchQuery: query}),
        })
        .then((response) => response.json())
        .then((data) => {
            setRecipeResults(data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [searchParams, setSearchParams]);

    // Recipe Search Functions --------------------------------

    const handleRecipeAutoComplete = (query) => {
        console.log('Autocomplete to be implemeted')
        setRecipeSearchTerm(query);
        // query = removeExtraWhitespace(removeNonAlpha(query));
        // if (query.length == 0) {
        //     setRecipeOptions([]);
        //     return;
        // }
        // const newTokens = query.split(' ');
        // // console.log('fetching');
        // // console.log(recipeSearchTokens)
        // setRecipeSearchTokens(newTokens);
        // fetch('http://127.0.0.1:5000/recipe-autocomplete', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ recipeSearchQuery: recipeSearchTokens.join(' ')}),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     setRecipeOptions(data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
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
                        {recipeResults.map((option) => (
                            <Card style={{margin: '25px 0px'}}>
                                <Card.Body>
                                    <Card.Title>{option.name}</Card.Title>
                                    <Card.Text>
                                        <b>Ingredients:</b> {option.ingredient_names.join(', ')}
                                    </Card.Text>
                                    <Button href="/recipe" variant="primary">View Recipe Details</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

