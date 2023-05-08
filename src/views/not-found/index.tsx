import React from 'react'
import { Button, Col, Result, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在！"
      extra={
        <Row gutter={50} justify="center">
          <Col>
            <Button type="primary" onClick={() => navigate(-1)}>
              返回上一页
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </Col>
        </Row>
      }
    />
  )
}

export default NotFound
