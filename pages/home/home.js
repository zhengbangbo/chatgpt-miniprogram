import { setTabSelected } from "../../utils/tabBar"
import { APP_VERSION } from '../../utils/config'
import { initPageStyle } from '../../utils/settings'

Page({
    data: {
        // 页面样式
        pageStyle: "",
        rootFontSize: "",

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
        initPageStyle(this)
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
    handleLargeFontModeChange() {
        const that = this
        const oldMode = this.data.largeFontMode
        this.setData({
            largeFontMode: !oldMode
        });
        wx.getStorage({
            key: "settings",
            success({ data }) {
                const oldSettings = JSON.parse(data)
                const newSettings = {
                    ...oldSettings,
                    largeFontMode: !oldMode
                }
                wx.setPageStyle({ "--messages-font-size": `${newSettings.largeFontMode ? 22 : 16}px` })

                wx.setStorage({
                    key: "settings",
                    data: JSON.stringify(newSettings),
                    success(){
                        initPageStyle(that)
                        setTabSelected(that, 2)
                    }
                })
            }
        })
    },
});

//# sourceMappingURL=home.js.map
