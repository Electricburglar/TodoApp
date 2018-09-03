import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import { Menu, Table, Icon } from 'antd';
import { Query } from "react-apollo";
import { getUser } from '../queries';
import withLogin from './LoginHOC';
import Login from './Login';
import styled from "styled-components";

const { Column } = Table;
const MarginTop = styled.div`
    margin-top: 7rem;
`;

class MyPage extends Component {
    render() {
        return (
            <div>
                <Menu mode="horizontal">
                    <Menu.Item><Link to="/changepw">비밀번호 변경</Link></Menu.Item>
                    <Menu.Item><Link to="/changenickname">닉네임 변경</Link></Menu.Item>
                    <Menu.Item><Link to="/deleteuser">회원 탈퇴</Link></Menu.Item>
                </Menu>
                <UserQuery />
            </div>
        );
    }
}

const UserQuery = () => <Query query={getUser} variables={{_id: cookie.load('userId')}}>
    {({loading, data, error, refetch}) => {
        if(loading) return <MarginTop>Loading</MarginTop>;
        if(error) return <MarginTop>페이지에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.</MarginTop>;
        if(data !== null && data.user !== undefined)
        {   
            return (
                <div>
                <div className="text-center"><Icon type="user" />{data.user.nickname}님</div>
                <div className="MyPage container">
                <Table
                    dataSource={data.user.todos}
                    pagination={{ pageSize: 5 }}
                    size="middle"
                    rowKey='_id'>
                    <Column
                    title = '제목'
                    dataIndex = 'text'
                    key = 'text'/>
                    <Column
                    title = '완료여부'
                    dataIndex = 'seen'
                    key = 'seen'
                    render={(seen) => {
                        if(seen === "true")
                            return <div>O</div>;
                        else
                            return <div>X</div>;
                    }}
                    className = 'text-center'/>
                </Table>
                </div>
                </div>);
        }
        refetch(data.user);
    }}
</Query>

export default withLogin(MyPage)(Login);