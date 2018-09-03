import React, { Component, Fragment } from "react";
import { getTodos, updateTodo, deleteTodo, getUser } from '../queries';
import { withRouter } from 'react-router-dom'
import { graphql, compose, Query } from 'react-apollo';
import cookie from 'react-cookies';
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import FontAwesome from "react-fontawesome";

const Notification = styled.div`
  background-color: white;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  width: 80%;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 2px solid ${props => (props.seen ? "transparent" : "#f1c40f")};
`;

const Title = styled.span`
  font-weight: 600;
`;

const Button = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 0;
  color: white;
  font-size: 16px;
  cursor: pointer;
  background-color: ${props => {
    if (props.seen) {
      return "#7f8c8d";
    } else if (props.success) {
      return "#2ecc71";
    } else if (props.danger) {
      return "#e74c3c";
    }
  }};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(1px);
  }
`;

const MarginTop = styled.div`
    margin-top: 7rem;
`;


class TodoContainer extends Component {

  deleteNotification = id => {
    const userId = cookie.load('userId');

    this.props.deleteTodoMutation({
      variables: {
        _id: id,
        userId
      },
      refetchQueries: [
        {
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
        }
      ],
    });
  }

  seeNotification = (id, seen) => {
    const userId = cookie.load('userId');
    this.props.updateTodoMutation({
      variables: {
        _id: id,
        userId,
        seen: seen === 'true'? false: true
      },
      refetchQueries: [{
        query: getTodos,
        variables: {
          userId
        }
      }],
    });
  }

  render() {
    return (
      <Query query={getTodos} variables={{userId: cookie.load('userId')}}>
      {({loading, data, error, refetch}) => {
        if(loading) return <MarginTop>Loading</MarginTop>;
        if(error) return <MarginTop>페이지에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.</MarginTop>;
        if(data !== null && data.todos !== undefined)
        { 
          return (
            <div>
              {data.todos.map( todo =>
              <Flex key={todo._id} alignCenter full column>
                <Notification seen={todo.seen === 'true'? true: false}>       
                  <Flex alignCenter justifyBetween>
                    <Title>{todo.text}</Title>
                    <FlexItem>
                      <Fragment>
                        <Fragment>
                          <Button
                            success
                            seen={todo.seen === 'true'? true: false}
                            onClick={() => this.seeNotification(todo._id, todo.seen)}>
                          <FontAwesome name="check" />
                          </Button>
                          <Button
                            danger
                            seen={todo.seen === 'true'? true: false}
                            onClick={() => this.deleteNotification(todo._id)}>
                          <FontAwesome name="times" />
                          </Button>
                        </Fragment>
                      </Fragment>
                    </FlexItem>
                  </Flex>
                </Notification>
              </Flex>)}
            </div>
          );
        }

        refetch(data);
      }}
      </Query>
    );
  }
}

export default compose(
  graphql(updateTodo, { name: 'updateTodoMutation'}),
  graphql(deleteTodo, { name: 'deleteTodoMutation'})
)(withRouter(TodoContainer));