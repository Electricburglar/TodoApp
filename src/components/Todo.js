import React, { Component } from 'react';
import { TodoContainer, TodoHeader } from './index';
import withLogin from './LoginHOC';
import Login from './Login';

class Todo extends Component {

    render() {
        return (
            <div className="Todo text-center">
                <TodoHeader />
                <TodoContainer />
            </div>
        );
    }
}

export default withLogin(Todo)(Login);