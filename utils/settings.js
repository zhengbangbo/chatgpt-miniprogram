export function initSettings() {
    try {
        const { fontSizeSetting } = wx.getSystemInfoSync()
        console.log(fontSizeSetting);
        wx.getStorage({
            key: "settings",
            success() {
                console.log("init settings success");
            },
            fail() {
                console.log("init settings fail");
                let settings = {}
                if(fontSizeSetting > 17 ) {
                    settings = {
                        largeFontMode: true
                    }
                } else {
                    settings = {
                        largeFontMode: false
                    }
                }
                wx.setStorage({
                    key: "settings",
                    data: JSON.stringify(settings)
                })
            }
    })
    } catch (e) {
        // Do something when catch error
    }
}

export function getSettings() {
    try {
        return JSON.parse(wx.getStorageSync('settings'))
    } catch (error) {

    }
}

export function initPageStyle(that) {
    const { largeFontMode } = getSettings()
    // 获取Page 中的data
    if(largeFontMode) {
        that.setData({
            pageStyle: "--messages-font-size: 22px;"
        })
    }else{
        that.setData({
            pageStyle: "--messages-font-size: 16px;"
        })
    }
}
