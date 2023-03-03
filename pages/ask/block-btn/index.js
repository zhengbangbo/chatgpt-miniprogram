import { login } from '../../../utils/login'

Component({
    properties: {
        loading: Boolean
    },
    methods: {
        onTap: function () {
            this.setData({ loading: true })
            const token = wx.getStorageSync('token')
            if (!token) {
                console.log("ready to login");
                login()
                console.log("login down");
                this.setData({ loading: false })
            } else {
                this.triggerEvent('ask')
            }
        }
    }
});
