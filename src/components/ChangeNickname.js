import React, { Component } from 'react';
import { Input, Button, Icon } from 'antd';
import cookie from 'react-cookies';
import { changeNickname, getUser } from '../queries';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import withLogin from './LoginHOC';
import Login from './Login';

class ChangeNickname extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            nickname: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            nickname: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { nickname } = this.state;
        const _id = cookie.load('userId');

        if(nickname === '')
        {
            alert("닉네임을 입력해주세요.");
            return;
        }

        const check = await this.props.changeNickname({
            variables: {
                _id,
                nickname
            },
            refetchQueries: [{
                query: getUser,
                variables: {
                    _id  
            }}]
        });

        if(check.data.changeNickname === true)
        {
            alert("닉네임을 변경하였습니다.");
            this.props.history.push('/mypage');
        }
        else
            alert("닉네임을 변경 할 수 없습니다.");
    }

    render() {
        return (
            <div className="marginTop container">
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Nickname" onChange={this.handleChange} />
                <Button className="BtnMargin" onClick={this.handleSubmit}>확인</Button>
                <Button className="BtnMargin" ><Link to='/mypage'>취소</Link></Button>
            </div>
        );
    }
}

export default withLogin(compose(
    graphql(changeNickname, { name: 'changeNickname'})
  )(withRouter(ChangeNickname)))(Login);