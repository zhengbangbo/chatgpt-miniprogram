/**
 * @name WxSocket
 * @description This is a wrapper class for the wx.connectSocket API.
 * @param {object} options The options for the socket.
 * @return {undefined}
 */

class WxSocket {
    constructor(options) {
      this.options = options
      this.socket = null
      this.init()
    }

    init() {
      this.socket = wx.connectSocket({
        url: this.options.url,
        header: this.options.header,
        protocols: this.options.protocols,
        tcpNoDelay: this.options.tcpNoDelay,
        perMessageDeflate: this.options.perMessageDeflate
      })

      this.socket.onOpen(() => {
        this.trigger('open')
      })

      this.socket.onMessage((res) => {
        this.trigger('message', res.data)
      })

      this.socket.onClose((e) => {
        this.trigger('close', e)
      })

      this.socket.onError((e) => {
        this.trigger('error', e)
      })
    }

    send(data) {
      this.socket.send({
        data: JSON.stringify(data)
      })
    }

    close(obj) {
      this.socket.close(obj)
    }

    /**
     * @description Adds a callback to an event in the events object.
     * @param {string} event The event name.
     * @param {function} callback The callback to be executed.
     * @return {undefined}
     */
    on(event, callback) {
      this.events = this.events || {}
      this.events[event] = this.events[event] || []
      this.events[event].push(callback)
    }

    /**
     * @description Triggers an event in the events object.
     * @param {string} event The event name.
     * @param {...any} args The arguments to be passed to the callback.
     * @return {undefined}
     */
    trigger(event, ...args) {
      this.events = this.events || {}
      if (this.events[event]) {
        this.events[event].forEach((callback) => {
          callback.apply(this, args)
        })
      }
    }
  }

  export default WxSocket
