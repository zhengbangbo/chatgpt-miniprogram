import { setTabSelected } from "../../utils/tabBar"
import { APP_VERSION } from '../../utils/config'

Page({
    data: {
        largeFontMode: false,
        extraClasses: '',
        versionInfo: "",
        about: "",
    },
    onShareAppMessage() {
        return {
            title: '我的',
            path: '/pages/home/home',
        };
    },
    onLoad: function () {
        const that = this
        wx.getStorage({
            key: 'settings',
            success({ data }) {
                const { largeFontMode } = JSON.parse(data)
                that.setData({
                    largeFontMode
                })
            }
        })
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
        setTabSelected(this, 2)
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
    },
    handleLargeFontModeChange() {
        const oldMode = this.data.largeFontMode
        this.setData({
            largeFontMode: !oldMode
        });
        wx.getStorage({
            key: "settings",
            success({data}) {
                const oldSettings = JSON.parse(data)
                console.log(oldSettings);
                const newSettings = {
                    ...oldSettings,
                    largeFontMode: !oldMode
                }
                wx.setPageStyle({"--messages-font-size": `${newSettings.largeFontMode ? 22 : 16}px`})

                console.log(newSettings);
                wx.setStorage({
                    key: "settings",
                    data: JSON.stringify(newSettings)
                })
            }
        })
    },
});

//# sourceMappingURL=home.js.map
