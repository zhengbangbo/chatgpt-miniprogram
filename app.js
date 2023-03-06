import { getAbout } from './utils/about';
import { login } from './utils/login'
import { getPrompts } from './utils/prompts';

App({
    onLaunch() {
        login();
        getAbout();
        getPrompts();
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
