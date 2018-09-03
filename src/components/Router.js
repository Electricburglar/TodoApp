import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Login, SignUp, Todo, MyPage, ChangePW, ChangeNickname, DeleteContainer } from './index';

const Router = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/todo" component={Todo} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/changepw" component={ChangePW} />
        <Route path="/changenickname" component={ChangeNickname} />
        <Route path="/deleteuser" component={DeleteContainer} />
    </Switch>
);

export default Router;