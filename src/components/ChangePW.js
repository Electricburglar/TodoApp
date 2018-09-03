import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { changePassword } from '../queries';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import withLogin from './LoginHOC';
import Login from './Login';
import crypto from 'crypto';
import cookie from 'react-cookies';
const FormItem = Form.Item;

class ChangePW extends React.Component {
  
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
          const salt = crypto.randomBytes(64).toString('base64');
          const iter = 10000;
          const hash = crypto.pbkdf2Sync(values.newpassword, salt, iter, 64, 'sha512').toString('base64');
  
          const check = await this.props.changePasswordMutation({
            variables:{
                _id: cookie.load('userId'),
                password: values.password,
                newpassword: {
                    hash,
                    salt,
                    iter
                },
            }
          });

          if(check.data.changePassword === true)
          {
            alert("비밀번호가 변경되었습니다.");
            this.props.history.push('/mypage');
          }
          else
            alert("비밀번호가 맞지않습니다.");
  
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newpassword')) {
      callback('비밀번호가 같지 않습니다.');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 16,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
    <div className="marginTop container">
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="기존 비밀번호"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '기존 비밀번호를 입력해주세요.',
            }, {
              min: 4, message: '4글자 이상 입력해주세요.'
            }, {
              max: 16, message: '16글자 이하 입력해주세요.'
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Old Password"/>
          )}
        </FormItem>      
        <FormItem
          {...formItemLayout}
          label="새 비밀번호"
        >
          {getFieldDecorator('newpassword', {
            rules: [{
              required: true, message: '새 비밀번호를 입력해주세요.',
            }, {
              validator: this.validateToNextPassword,
            }, {
              min: 4, message: '4글자 이상 입력해주세요.'
            }, {
              max: 16, message: '16글자 이하 입력해주세요.'
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="새 비밀번호 확인"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '새 비밀번호 확인을 입력해주세요.',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password Cofirm" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button className="BtnMargin" htmlType="submit" >변경</Button>
          <Button className="BtnMargin" ><Link to='/mypage'>취소</Link></Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const ChangePWForm = Form.create()(ChangePW);

export default withLogin(compose(
    graphql(changePassword, { name: 'changePasswordMutation'}),
  )(withRouter(ChangePWForm)))(Login);