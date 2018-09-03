import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import client from "./apolloClient";
import { ApolloProvider } from 'react-apollo';

ReactDOM.render(
<ApolloProvider client={client}>
    <Router>
        <App />
    </Router>
</ApolloProvider>,
document.getElementById('root'));
