import React from 'react'
import { Button, Form, Input } from 'antd'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

const LoginForm = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log('onFinish', values)
  }

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder="请输入密码" />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button type="primary" htmlType="submit" icon={<UserOutlined />}>
          登录
        </Button>
        <Button
          onClick={() => form.resetFields()}
          icon={<CloseCircleOutlined />}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
