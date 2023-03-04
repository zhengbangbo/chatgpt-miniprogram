import { setTabSelected } from '../../utils/tabBar';
import { APP_VERSION } from '../../utils/config'

Page({
    data: {
        extraClasses: '',
        versionInfo: ""
    },
    onLoad(options) {
        const { path, q } = options;
        // 小程序跳转各个小程序组件库
        if (q) {
            // Navigator.gotoPage(path, rest);
            // console.log(option);
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }
    },
    clickHandle(e) {
        let { name, path = '' } = e.detail.item;
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    onShareAppMessage() {
        return {
            title: '更多功能',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        // 必须是合法字符串
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
    onLoad: function () {
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
