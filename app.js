import { login } from './utils/login'
App({
    onLaunch() {
        wx.checkSession({
            success() {
                console.log("session_key 未过期，并且在本生命周期一直有效");
                const token = wx.getStorageSync('token')
                if (!token) {
                    console.log("session_key 未过期，但是没有找到 token");
                    login()
                }
            },
            fail() {
                console.log("session_key 已经失效，需要重新执行登录流程");
                wx.clearStorageSync('token')
                login()
            }
        })

    },
});

//# sourceMappingURL=app.js.map
