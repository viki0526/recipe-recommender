import React, { useState, useEffect } from 'react';
import { Card, Button, Nav, Tab } from 'react-bootstrap';
import {useLocation} from "react-router-dom";
import '../css/RecipeDetails.css';

export default function RecipeDetails() {
    const { state } = useLocation();
    const [liked, setLiked] = useState(false);
    const [activeTab, setActiveTab] = useState('ingredients');

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    return (
        <>
        <h1>{state.name}</h1>
        <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="ingredients">Ingredients</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="instructions">Instructions</Nav.Link>
                </Nav.Item>
            </Nav>

            <Card className="mt-2">
                <Card.Body>
                    <Tab.Content>
                        <Tab.Pane eventKey="ingredients">
                            <ul className='list-group'>
                                {state.ingredients.map((ingredient, index) => (
                                <li key={index} className='list-group-item'>{ingredient}</li>
                                ))}
                            </ul>
                        </Tab.Pane>
                        <Tab.Pane eventKey="instructions">
                            <ol className='list-group'>
                                {state.directions.map((step, index) => (
                                <li key={index} className='list-group-item'>
                                    <b>{index + '. '}</b>
                                    {step}
                                </li>
                                ))}
                            </ol>
                        </Tab.Pane>
                    </Tab.Content>
                </Card.Body>
            </Card>
        </Tab.Container>
            {/* <div>
                <h1>{state.name}</h1>
                <Card>
                    <Card.Body>
                    <Card.Title>Ingredients:</Card.Title>
                    <ul>
                        {state.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <Card.Title>Directions:</Card.Title>
                    <ol>
                        {state.directions.map((step, index) => (
                        <li key={index}>{step}</li>
                        ))}
                    </ol>
                    <Button variant={liked ? 'danger' : 'primary'} onClick={handleLike}>
                        {liked ? 'Unlike thie recipe' : 'Like this recipe'}
                    </Button>
                    </Card.Body>
                </Card>
            </div> */}
        </>
    )
}
