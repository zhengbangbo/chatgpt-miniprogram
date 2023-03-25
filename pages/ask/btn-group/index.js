import { getToken } from '../../../utils/login'

Component({
    properties: {
        loading: Boolean
    },
    methods: {
        handleSend() {
            const that = this
            wx.getStorage({
                key: 'token',
                success() {
                    that.triggerEvent('send')
                },
                fail() {
                    getToken()
                    wx.showToast({
                      title: '请重试',
                      icon: 'success'
                    })
                }
            })
        },
        handleClear() {
            this.triggerEvent('clear')
        },
        handleStop() {
            this.triggerEvent('stop')
        }
    }
});
