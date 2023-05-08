import React from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import { shallowAppEqual, useAppSelector, useAppDispatch } from '@/store/hooks'
import { changeMessageAction } from '@/store/modules/counter'

function App() {
  const { count, message, address } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
      address: state.counter.address
    }),
    shallowAppEqual
  )

  const dispatch = useAppDispatch()
  function handleChangeMessage() {
    dispatch(changeMessageAction('哈哈哈哈哈哈哈'))
  }

  return (
    <div className="App">
      <h2>当前计数：{count}</h2>
      <h2>message：{message}</h2>
      <h2>地址：{address}</h2>
      <button onClick={handleChangeMessage}>修改message</button>
      {useRoutes(routes)}
    </div>
  )
}

export default App
