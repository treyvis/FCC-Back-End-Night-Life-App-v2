import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import { Link } from 'react-router-dom';
import api from '../Logic/api.js';
const FormItem = Form.Item;

class Signup extends Component {

  state = {
    name: '',
    email: '',
    pasword: ''
  };

  onChange = (value, key) => {
    const state = this.state;
    state[key] = value;
    this.setState(state);
  }

  onSubmit = () => {
    api.createUserEmail(this.state.name, this.state.email, this.state.password);
  }

  render() {
    return (
      <Form className="login-form" style={{maxWidth: 300, margin: '20px auto'}}>
        <FormItem>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" 
              onChange={(e) => {this.onChange(e.target.value, 'name')}} value={this.state.name}/>
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} placeholder="Email" 
              onChange={(e) => {this.onChange(e.target.value, 'email')}} value={this.state.email}/>
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" 
              onChange={(e) => {this.onChange(e.target.value, 'password')}} value={this.state.password}/>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}
            onClick={this.onSubmit}>
            Sign Up!
          </Button>
          Or <Link to='/login'>login!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Signup;