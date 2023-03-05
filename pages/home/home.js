import { setTabSelected } from '../../utils/tabBar';
import { APP_VERSION } from '../../utils/config'

Page({
    data: {
        extraClasses: '',
        versionInfo: "",
        about: ""
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
            success({data}) {
               that.setData({
                   about: data
               }) 
            }
        })
        const versionInfo = "当前版本：" + APP_VERSION
        this.setData({ versionInfo })
    },
    onShow: function () {
        setTabSelected(this, 1)
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
    }
});

//# sourceMappingURL=home.js.map
