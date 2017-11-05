import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {
  render() {
    return (
      <Form className="login-form" style={{maxWidth: 300, margin: '20px auto'}}>
        <FormItem>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="idcard" style={{ fontSize: 13 }} />} placeholder="Email" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
            Sign Up!
          </Button>
          Or <a href="">log in!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Signup;