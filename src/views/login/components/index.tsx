import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { HOME_PATH } from '@/global/constants'

const LoginForm = () => {
  const [form] = Form.useForm()
  const [isloading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true)
      navigate(HOME_PATH)
    } finally {
      setIsLoading(false)
    }
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
        <Button
          type="primary"
          htmlType="submit"
          loading={isloading}
          icon={<UserOutlined />}
        >
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
