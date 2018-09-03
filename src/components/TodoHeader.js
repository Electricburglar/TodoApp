import React, { Component } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";
import cookie from 'react-cookies';
import { Textfield } from 'react-mdl';
import { createTodo, getTodos, getUser } from '../queries';
import { withRouter } from 'react-router-dom'
import { graphql, compose, Query } from 'react-apollo';

const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: #ecf0f1;
  padding: 0 40px;
  margin-bottom: 30px;
`;

const HeaderIcon = styled.span`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  color: white;
  background-color: #3498db;
  margin-right: 30px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  position: relative;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Number = styled.span`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #8e44ad;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 25px;
  top: -10px;
`;

class HeaderPresenter extends Component {

  constructor(props){
    super();
  }

  createNotification = (text) => {
    const userId = cookie.load('userId');
    
    this.props.createTodoMutation({
      variables:{
        text: text,
        userId
      },
      refetchQueries: [{
        query: getTodos,
        variables: {
          userId
        }
      },
      {
        query: getUser,
        variables: {
          _id: userId
        }
      }],
    });

    document.getElementById('todo-text').value = "";
  };

  render()
  {
    return(
      <Header>
      <Flex full justifyBetween alignCenter>
        <FlexItem>
          <Textfield style={{width: '100%'}} id="todo-text" label="할 일을 입력하세요."/>
        </FlexItem>
        <FlexItem style={{marginLeft:'10px'}}>
          <Flex>
            <HeaderIcon onClick={() => {
              const text = document.getElementById('todo-text').value;
              if(text === "")
              {
                alert("할 일을 입력해주세요.");
                return;
              }  
              else
               {
                this.createNotification(text);
               }}}>
            <FontAwesome name="plus" />
            </HeaderIcon>
            <HeaderIcon>
              <FontAwesome name="bell" />
              <Number>
                <UserQuery />
              </Number>
            </HeaderIcon>
          </Flex>
        </FlexItem>
      </Flex>
    </Header>
    );
  }
}

const UserQuery = () => <Query query={getUser} variables={{_id: cookie.load('userId')}}>
    {({loading, data, error, refetch}) => {
        if(loading) return <div>Loading</div>;
        if(error) return <div>페이지에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.</div>;
        if(data !== null && data.user !== undefined)
        {
            return <div>{data.user.count}</div>;
        }
        refetch(data);
    }}
</Query>

export default compose(
  graphql(createTodo, { name: 'createTodoMutation'}),
)(withRouter(HeaderPresenter));