import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const userPersist = localStorage.getItem('persist:user')
      const token = userPersist ? JSON.parse(userPersist).token : ''

      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization =
          'Bearer ' + token.replace(/^"(.*)"$/, '$1')
      }

      return config
    }
  }
})

export default hyRequest
