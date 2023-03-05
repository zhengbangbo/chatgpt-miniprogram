import { login } from './utils/login'

App({
    onLaunch() {
        login();
        wx.getStorage({
            key: 'messages',
            success({ data }) {
            },
            fail() {
                wx.setStorage({
                    key: "messages",
                    data: "[]"
                })
            }
        })
    },
    onShow() {
    }
});

//# sourceMappingURL=app.js.map
