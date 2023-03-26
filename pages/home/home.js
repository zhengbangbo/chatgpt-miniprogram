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
    handleTapVersionLog() {
        wx.navigateToMiniProgram({
            appId: 'wx5b97b0686831c076',
            path: 'pages/preview/preview?fid=224050826248&sid=chEQFL0vsLBG&fname=%E3%80%8C%E5%B0%8F%E5%8D%9A%E6%9D%A5%E5%B8%AE%E4%BD%A0%E3%80%8D%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.otl&groupid=525258221',
            success(res) {
              // 打开成功
            }
          })
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
