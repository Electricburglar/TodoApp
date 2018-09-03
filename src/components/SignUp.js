import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { doSignUp, checkEmail } from '../queries';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';
import crypto from 'crypto';

const FormItem = Form.Item;

class SignUpForm extends React.Component {
  
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    email: '',
    checkBtn: false
  };

  emailCheck = async (e) => {
    e.preventDefault();

    if(this.state.email === '')
    {
      alert("이메일을 입력하세요.")
    }
    else
    {
      const check = await this.props.checkEmailMutation({
        variables:{
          email: this.state.email
        }
      });
  
      if(check.data.emailCheck === true)
      {
        alert("중복 이메일입니다. 다시 입력해주세요.");
      }
      else
      {
        this.setState({
          checkBtn: true
        });
        alert("사용 가능한 이메일입니다.");
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if(this.state.checkBtn === true)
        {
          const salt = crypto.randomBytes(64).toString('base64');
          const iter = 10000;
          const hash = crypto.pbkdf2Sync(values.password, salt, iter, 64, 'sha512').toString('base64');
  
          const check = await this.props.doSignUpMutation({
            variables:{
              email: values.email,
              password: {
                hash,
                salt,
                iter
              },
              nickname: values.nickname
            }
          });
          
          if(check.data.signup === true)
          {
            alert("가입을 축하드립니다!");
            this.props.history.push('/login');
          }
          else
            alert("가입에 실패하였습니다. 다시 시도해주세요.");
        }
        else
        {
          alert("이메일을 중복확인 하세요.");
        }
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
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
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'E-mail 형식이 아닙니다.',
            }, {
              required: true, message: 'E-mail을 입력해주세요.',
            }],
          })(
            <Input onChange={(e) => {
              this.setState({
                email: e.target.value})
            }} placeholder="Example@example.com"/>
          )}
          <Button onClick={this.emailCheck}>중복확인</Button>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="비밀번호"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '비밀번호를 입력해주세요.',
            }, {
              validator: this.validateToNextPassword,
            }, {
              min: 4, message: '4글자 이상 입력해주세요.'
            }, {
              max: 16, message: '16글자 이하 입력해주세요.'
            }],
          })(
            <Input type="password" placeholder="Password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="비밀번호 확인"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '비밀번호 확인을 입력해주세요.',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Password Confirm"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              별명&nbsp;
              <Tooltip title="닉네임">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '별명을 입력해주세요', whitespace: true }],
          })(
            <Input placeholder="Example"/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button htmlType="submit">회원가입</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm);

export default compose(
  graphql(doSignUp, { name: 'doSignUpMutation'}),
  graphql(checkEmail, { name: 'checkEmailMutation'})
)(withRouter(WrappedSignUpForm));