import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import { Notification } from './components/Notification'
import store from './redux'
import router from './router'
import { getCurrentUser } from './service/user'

import './styles/index.css'

console.warn("【安全警告】请勿在控制台输入任何指令除非您很清楚其作用！")

getCurrentUser().then(data => {
  store.dispatch({ type: "user/setUser", user: data })
}).catch(err => {
  store.dispatch({ type: "user/deleteUser" })
  console.warn("【会话】用户未登录")
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NavigationBar />
    <RouterProvider router={router} />
    <Notification />
  </React.StrictMode>
)
