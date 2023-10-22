import React, {useState, useEffect} from 'react';
import '../css/Home.css';
import SideBar from './SideBar';
import { Dropdown, FormControl, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function Home () {
    const [recipeSearchTerm, setRecipeSearchTerm] = useState('');
    const [recipeOptions, setRecipeOptions] = useState([]);
    const [recipeAutocomplete, setRecipeAutocomplete] = useState(false)


    // Recipe Search Functions --------------------------------

    const handleRecipeAutoComplete = (query) => {
        setRecipeSearchTerm(query);
        setRecipeOptions(['autocomplete']);
    }

    const handleRecipeSearch = (searchTerm) => {
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
                                    onKeyDown={(e) => handleRecipeSearch(e.target.value)}
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
                        {recipeOptions.map((option) => (
                            <Card>
                                <Card.Body>
                                    <Card.Title>Recipe Name</Card.Title>
                                    <Card.Text>
                                        List of Ingredients:
                                    </Card.Text>
                                    <Button href="/recipe" variant="primary">View Recipe Details</Button>
                                </Card.Body>
                            </Card>
                        ))}
                        <Card>
                            <Card.Body>
                                <Card.Title>Recipe Name</Card.Title>
                                <Card.Text>
                                    List of Ingredients:
                                </Card.Text>
                                <Button href="/recipe" variant="primary">View Recipe Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

