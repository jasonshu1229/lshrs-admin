import React from 'react'
import { Button } from 'antd'

import { shallowAppEqual, useAppDispatch, useAppSelector } from '@/store/hooks'
import { incrementAction, changeMessageAction } from '@/store/modules/counter'

const Demo = () => {
  const { count, message, address } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
      address: state.counter.address
    }),
    shallowAppEqual
  )

  const dispatch = useAppDispatch()
  const handleChangeCount = () => {
    dispatch(incrementAction())
  }
  const handleChangeMessage = () => {
    dispatch(changeMessageAction('哈哈哈哈哈哈哈'))
  }

  return (
    <div className="demo">
      <h2>当前计数：{count}</h2>
      <h2>message：{message}</h2>
      <h2>地址：{address}</h2>
      <Button onClick={handleChangeCount}>修改count</Button>
      <Button type="primary" onClick={handleChangeMessage}>
        修改message
      </Button>
    </div>
  )
}

export default Demo
