import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import cookie from 'react-cookies';
import { doLogin } from '../queries';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

const FormItem = Form.Item;

class LoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
          if (!err) {
            const user = await this.props.doLoginMutation({
              variables: {
                email: values.email,
                password: values.password,
              },
            })
            
            if(user.data.login !== "false")
            {
              const cookieOptions = {
                path: '/',
                maxAge: 3600
              }
              cookie.save('userId', user.data.login, cookieOptions);
              this.props.history.replace('/');
              this.props.onLogin();
            }
            else
            {
              alert("ID와 PW가 일치하지 않습니다.");
            }
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {required: true, message: 'E-mail을 입력해주세요.'},
                  {type: 'email', message: 'E-mail 형식이 아닙니다.'}],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '비밀번호를 입력해주세요.' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" ghost htmlType="submit" style={{borderColor: 'gray', color: 'gray'}} className="login-form-button">
                LOGIN
              </Button>
            </FormItem>
          </Form>
        );
      }
    }

const WrappedNormalLoginForm  = Form.create()(LoginForm);

export default compose(
  graphql(doLogin, { name: 'doLoginMutation'})
)(withRouter(WrappedNormalLoginForm));