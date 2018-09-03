import React, { Component } from 'react';
import Store from '../store';
import DeleteUser from './DeleteUser';
import withLogin from './LoginHOC';
import Login from './Login';

class DeleteContainer extends Component {

    render() {
        return(
            <Store.Consumer>
            { store => (
                <DeleteUser onLogout={store.onLogout}/>
            )}
            </Store.Consumer>
        );
    }
}

export default withLogin(DeleteContainer)(Login);