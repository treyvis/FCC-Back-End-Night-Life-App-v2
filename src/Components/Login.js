import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import api from '../Logic/api.js';
const FormItem = Form.Item;

class Login extends Component {
  
  state = {
    email: '',
    password: ''
  }

  onChange = (value, key) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  }

  onSubmit = () => {
    api.loginUserEmail(this.state.email, this.state.password).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error.code, error.message);
    })
  }

  render() {
    return (
      <Form className="login-form" style={{maxWidth: 300, margin: '20px auto'}}>
        <FormItem>
            <Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} placeholder="Email" 
              value={this.state.email} onChange={e => {this.onChange(e.target.value, 'email'); }}/>
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" 
              value={this.state.password} onChange={e => {this.onChange(e.target.value, 'password')}}/>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}
            onClick={this.onSubmit}>
            Login!
          </Button>
          Or <Link to='/signup'>sign up!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Login;