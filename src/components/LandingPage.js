import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

class LandingPage extends Component {

    render() {
        return (
            <Jumbotron className="Jumbotron">
                <h1>Todo App</h1>
                <p>                        
                    <img className="IMG" src="http://cfile22.uf.tistory.com/image/99EBBB3D5B7AC9B9207A2C" alt='TodoImg' />
                </p>
                <p>
                    This is a Todo Web Site.<br/>
                    Make Web Site with ReactJS, GraphQL & Apollo and MongoDB.
                </p>
                <Carousel autoplay dots={false}>
                    <div><h3>Add Reminders, Due and Date</h3></div>
                    <div><h3>Plan For Your Schedule</h3></div>
                    <div><h3>Manage Your Tasks With Todo App</h3></div>
                </Carousel>
                <p>
                <Link to="/signup"><Button bsStyle="primary">Start Now</Button></Link>
                </p>
            </Jumbotron>
        );
    }
}

export default LandingPage;