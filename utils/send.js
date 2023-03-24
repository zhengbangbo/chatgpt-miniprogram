import WxSocket from './wxsocket'
import { WEBSOCKET_URL_BASE } from './config'

export function websocketSend(that, oneTime = false) {
  let content = ""
  const token = wx.getStorageSync('token')
  const url = `${WEBSOCKET_URL_BASE}/ws/v1/chat`
  that.socket = new WxSocket({
    url,
    header: {
      'x-token': token
    },
  })

  that.socket.on('open', () => {
    console.log('WebSocket 已连接')
    if (oneTime) {
      const messages = [
        { "role": "user", "content": that.data.askText }
      ]
      that.setData({
        loading: true,
      })
      const r = {
        id: that.data.id,
        messages
      }
      that.socket.send(r)
    } else {
      const messages = [
        ...that.data.messages,
        { "role": "user", "content": that.data.askText }
      ]
      const scrollLast = `msg${that.data.messages.length + 1}`
      console.log('scrollLast: ', scrollLast);
      that.setData({
        loading: true,
        scrollLast,
        messages,
        askText: ""
      })
      const r = {
        id: 1,
        messages
      }
      that.socket.send(r)
    }
  })

  that.socket.on('message', (data) => {
    console.log('收到消息：', data)
    content += data
    if (oneTime) {
      that.setData({
        showContent: true,
        content,
      })
    } else {
      const scrollLast = `msg${that.data.messages.length + 2}`
      that.setData({
        onStream: true,
        scrollLast,
        content
      })
    }
  })

  that.socket.on('close', ({ code, reason }) => {
    console.log('WebSocket 已关闭: ', code, reason)
    if (oneTime) {
      if (code >= 1000 && code <= 1011) {
        if (code === 1006) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }
        that.setData({
          loading: false,
        })
      } else if (code >= 3000 && code <= 3999) {
        that.setData({
          loading: false,
        })
        wx.showToast({
          title: reason,
          icon: 'error'
        })
      } else if (code >= 4000 && code <= 4999) {
        that.setData({
          loading: false,
        })
        wx.showToast({
          title: reason,
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '服务器异常',
          icon: 'error'
        })
        that.setData({
          loading: false,
        })
      }
    } else {
      const messages = [
        ...that.data.messages,
        { "role": "assistant", "content": that.data.content }
      ]
      if (code >= 1000 && code <= 1011) {
        if (code === 1006) {
          wx.showToast({
            title: '网络异常',
            icon: 'error'
          })
        }

        that.setData({
          loading: false,
          onStream: false,
          content: "",
          messages
        })
      } else if (code >= 3000 && code <= 3999) {
        that.setData({
          loading: false,
          onStream: false,
        })
        wx.showToast({
          title: reason,
          icon: 'error'
        })
      } else if (code >= 4000 && code <= 4999) {
        that.setData({
          loading: false,
          onStream: false,
          askText: "",
          content: "",
        })
        wx.showToast({
          title: reason,
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '服务器异常',
          icon: 'error'
        })

        that.setData({
          loading: false,
          onStream: false,
        })

      }

    }
  })

  that.socket.on('error', (e) => {
    console.log('WebSocket 出错：', e)
  })

}
