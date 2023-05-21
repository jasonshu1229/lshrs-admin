import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { HOME_PATH } from '@/global/constants'
import { Login } from '@/types/login'
import { fetchUserInfoAction } from '@/store/modules/user'
import { shallowAppEqual, useAppDispatch, useAppSelector } from '@/store/hooks'

const LoginForm = () => {
  const [form] = Form.useForm()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(
    (state) => ({
      token: state.user.token ?? ''
    }),
    shallowAppEqual
  )

  const navigate = useNavigate()

  const onFinish = async (values: Login.LoginParams) => {
    try {
      setIsLoading(true)
      const name = values.name
      const password = values.password

      dispatch(fetchUserInfoAction({ name, password }))

      localStorage.setItem('token', token)

      messageApi.open({
        type: 'success',
        content: '登录成功'
      })
      // navigate(HOME_PATH)
    } finally {
      setIsLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    messageApi.open({
      type: 'error',
      content: '登录失败，请您输入正确的格式后再操作~~'
    })
  }

  return (
    <Form
      form={form}
      name="login"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {contextHolder}
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: '请输入6~20位数字或字母组成的用户名',
            pattern: /^[a-z0-9]{6,20}$/
          }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入三位以上数字或字母组成的密码',
            pattern: /^[a-z0-9]{3,}$/
          }
        ]}
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
