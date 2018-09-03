import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Query } from "react-apollo";
import { getUser } from '../queries';
import LandingPage from './LandingPage';
import { Jumbotron } from 'react-bootstrap';
import withLogin from './LoginHOC';
import styled from "styled-components";

const MarginTop = styled.div`
    margin-top: 7rem;
`;

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <Jumbotron className="Jumbotron">
                    <p>
                    <img className="IMG" src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width='400px' alt='cat'/>
                    </p>
                    <UserQuery/>
                </Jumbotron>
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
                    <h2>{data.user.nickname}님 반갑습니다!</h2>
                    <p>
                        현재 할 일의 수는 {data.user.count}개 입니다. 
                    </p>
                </div>
            );
        }

        refetch(data.user);
    }}
</Query>

export default withLogin(Home)(LandingPage);