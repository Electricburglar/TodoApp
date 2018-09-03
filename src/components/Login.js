import React, { Component } from 'react';
import { LoginForm } from './index';
import { Link } from 'react-router-dom';
import Store from '../store';
import { Alert } from 'antd';

class Login extends Component {
    render() {
        return (
            <div className="marginTop container">
                <Alert message="서버에 따라 응답이 느릴 수 있습니다. 잠시만 기다려주세요." type="warning" showIcon banner className="text-left"/>
                <Store.Consumer>
                {store => (
                    <LoginForm onLogin={store.onLogin}/>)}
                </Store.Consumer>
                <div className="text-right">
                    <Link to='/signup'>회원가입</Link>
                </div>
            </div>
        );
    }
}

export default Login;