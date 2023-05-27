import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { Login } from '@/types/login'
import {
  CACHE_NAME,
  CACHE_PASSWORD,
  HOME_PATH,
  CACHE_TOKEN
} from '@/global/constants'
import { fetchUserInfoAction } from '@/store/modules/user'
import { shallowAppEqual, useAppDispatch, useAppSelector } from '@/store/hooks'
import { localCache } from '@/utils/cache'

const LoginForm = () => {
  const [form] = Form.useForm()
  const [isloading, setIsLoading] = useState<boolean>(false)
  const tokenRef = useRef<string>()
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()
  tokenRef.current = useAppSelector(
    (state) => state.user.token,
    shallowAppEqual
  )

  const navigate = useNavigate()

  useEffect(() => {
    const cacheName = localCache.getCache(CACHE_NAME)
    const cachePassword = localCache.getCache(CACHE_PASSWORD)

    if (cacheName && cachePassword) {
      form.setFieldsValue({
        name: cacheName,
        password: cachePassword
      })
    }
  }, [])

  const onRememberPassword = (isRemember: boolean) => {
    // if (isRemember) {
    //   console.log('需要记住密码')
    //   localCache.setCache(CACHE_NAME, name)
    //   localCache.setCache(CACHE_PASSWORD, password)
    // } else {
    //   localCache.removeCache(CACHE_NAME)
    //   localCache.removeCache(CACHE_PASSWORD)
    // }

    const method = isRemember ? 'setCache' : 'removeCache'
    ;[CACHE_NAME, CACHE_PASSWORD].forEach((key) =>
      localCache[method](key, isRemember ? form.getFieldValue(key) : null)
    )
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
        onRememberPassword(isRemember)
        localCache.setCache(CACHE_TOKEN, tokenRef.current)
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
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
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
