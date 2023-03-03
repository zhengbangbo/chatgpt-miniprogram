import { login } from '../../../utils/login'

Component({
    properties: {
        loading: Boolean,
    },
    methods: {
        onTap: function () {
            this.setData({loading: true})
            const token = wx.getStorageSync('token')
            if(!token) {
                login()
                this.setData({loading: false})
            } else {
                this.triggerEvent('ask')
            }
        }
    }
});
