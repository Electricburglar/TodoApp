import React, { Component } from 'react';
import Store from '../store';

const withLogin = (WrappedComponent) => (LoginComponent) =>
    
class IsLogin extends Component {
    render() {
        return (
            <Store.Consumer>
            { store => {
                if(store.logged === false)
                    return <LoginComponent />;
                else
                    return <WrappedComponent />;
            }}
            </Store.Consumer>
        );
    }
};

export default withLogin;