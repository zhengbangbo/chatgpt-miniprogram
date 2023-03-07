import { login } from '../../../utils/login'

Component({
    properties: {
        loading: Boolean
    },
    methods: {
        handleSend() {
            const that = this
            this.setData({ loading: true })
            wx.getStorage({
                key: 'token',
                success({ data }) {

                },
                fail() {
                    login()
                    that.setData({ loading: false })
                }
            })
            const token = wx.getStorageSync('token')
            if (!token) {
            } else {
                console.log('send');
                this.triggerEvent('send')
            }
        },
        handleClear() {
            this.triggerEvent('clear')
        }
    }
});
