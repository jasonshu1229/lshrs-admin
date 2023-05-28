import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { Login } from '@/types/login'
import { HOME_PATH } from '@/global/constants'
import {
  changePassword,
  changeRememberStatus,
  changeUserNanme,
  fetchUserInfoAction
} from '@/store/modules/user'
import { shallowAppEqual, useAppDispatch, useAppSelector } from '@/store/hooks'

const LoginForm = () => {
  const [form] = Form.useForm()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const { name, password, isRemember } = useAppSelector(
    (state) => ({
      name: state.user.name,
      password: state.user.password,
      isRemember: state.user.isRemember
    }),
    shallowAppEqual
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (name && password) {
      form.setFieldsValue({
        name: name,
        password: password
      })
    }

    dispatch(changeRememberStatus(isRemember))
  }, [name, password])

  const handleRememberPassword = (
    isRemember: boolean,
    name: string,
    password: string
  ) => {
    dispatch(changeUserNanme(isRemember ? name : ''))
    dispatch(changePassword(isRemember ? password : ''))
  }

  const onFinish = async (values: Login.LoginParams) => {
    try {
      setIsLoading(true)
      const { name, password } = values
      const isRemember = form.getFieldValue('remember')

      const resultAction = await dispatch(
        fetchUserInfoAction({ name, password })
      )

      if (fetchUserInfoAction.fulfilled.match(resultAction)) {
        // 判断是否需要记住用户的登录状态
        handleRememberPassword(isRemember, name, password)
        // 登陆成功后，store中已经存入 token
        messageApi.open({
          type: 'success',
          content: '登录成功'
        })
        navigate(HOME_PATH)
      }
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
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: isRemember }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      onValuesChange={(changedValues) => {
        if ('remember' in changedValues) {
          dispatch(changeRememberStatus(changedValues.remember))
        }
      }}
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
        validateTrigger="onSubmit"
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
        validateTrigger="onSubmit"
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
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
        className="login-remember"
      >
        <Checkbox>记住密码</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
