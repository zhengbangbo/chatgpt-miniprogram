import { setTabSelected } from '../../utils/tabBar';
import { APP_VERSION } from '../../utils/config'

Page({
    data: {
        extraClasses: '',
        versionInfo: "",
        about: "",
        prompts: []
    },
    onShareAppMessage() {
        return {
            title: '更多功能',
            path: '/pages/home/home',
        };
    },
    onLoad: function () {
        const that = this
        wx.getStorage({
            key: 'about',
            success({ data }) {
                that.setData({
                    about: data
                })
            }
        })
        wx.getStorage({
            key: 'prompts',
            success({ data }) {
                that.setData({
                    prompts: data
                })
            }
        })
        const versionInfo = "当前版本：" + APP_VERSION
        this.setData({ versionInfo })
    },
    onShow: function () {
        setTabSelected(this, 1)
    },
    handleTapAsk() {
        wx.navigateTo({
            url: '/pages/ask/ask',
        })
    },
    handleTapLogo: function () {
        if (this.data.extraClasses == 'logo-transition logo-moved') {
            this.setData({
                extraClasses: 'logo-transition'
            })
        } else {
            this.setData({
                extraClasses: 'logo-transition logo-moved'
            })
        }
    },
    handleExplanation() {
        wx.navigateToMiniProgram({
            appId: 'wx5b97b0686831c076',
            path: 'pages/preview/preview?fid=221600740977&sid=ciBtobPXuaT9&fname=%E3%80%8C%E5%B0%8F%E5%8D%9A%E6%9D%A5%E5%B8%AE%E4%BD%A0%E3%80%8D%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.otl&groupid=525258221',
            envVersion: 'release',
            success(res) {
                // 打开成功
            },
            fail: function (e) {
                console.log(e)
            }
        })
    },
    handleFeedback() {
        wx.navigateToMiniProgram({
            appId: 'wx53f22ed6915cdf17',
            path: 'pages/form-write/form-write?scene=s%3D3rr2UG3Z%3Bspe%3Dksform',
            envVersion: 'release',
            success(res) {
                // 打开成功
            },
            fail: function (e) {
                console.log(e)
            }
        })
    }
});

//# sourceMappingURL=home.js.map
