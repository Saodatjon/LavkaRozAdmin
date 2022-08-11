import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Card, Input, Row } from 'antd';
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import $host from '../https/https'
import {login} from '../utilis/urls'

function Login() {
  const { setUser } = useContext(UserContext)
  
  function formHandler({username, password}) {
    $host.post(login, {username, password}).then(function (res){
      if (res.data.isOk){
        localStorage.setItem('access_token',  res.data.accessToken)
        localStorage.setItem('refresh_token',  res.data.refreshToken)
        localStorage.setItem('user', true)
        setUser(true)
      }
    }).catch(function (error){
      alert(error)
    })
  }
  return (
    <Row justify='center' align='middle' style={{minHeight:'100vh'}}>
         <Card
      title="Card title"
      bordered={false}
      style={{
        width: 300,
      }}
      >
       <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={(e)=> formHandler(e)}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button"  style={{ dispaly:"block", margin:'0 auto'}}>
          Log in
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </Row>
  )
}

export default Login