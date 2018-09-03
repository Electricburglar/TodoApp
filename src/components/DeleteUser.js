import React, { Component } from 'react';
import { Icon, Input, Button, Alert } from 'antd';
import cookie from 'react-cookies';
import { deleteUser } from '../queries';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

class DeleteUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }
      
    handleSubmit = async (e) => {
        e.preventDefault();
        const { password } = this.state;
        
        if(password === '')
        {
            alert("비밀번호를 입력하세요.");
            return;
        }

        const check = await this.props.deleteUserMutation({
            variables:{
                _id: cookie.load('userId'),
                password
            }
        });
        
        if(check.data.deleteUser === true)
        {
            cookie.remove('userId');
            this.props.onLogout();
            this.props.history.push('/');
        }
        else
        {
            alert("비밀번호가 맞지 않습니다.");
        }
    }

    render() {
        return (
            <div className="marginTop container">
                <Alert message="삭제하신 계정은 복구되지 않습니다." type="error" showIcon banner className="text-left"/>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleChange} />
                <div>
                    <Button className="BtnMargin" onClick={this.handleSubmit}>확인</Button>
                    <Button className="BtnMargin" ><Link to='/mypage'>취소</Link></Button>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(deleteUser, { name: 'deleteUserMutation'})
  )(withRouter(DeleteUser));