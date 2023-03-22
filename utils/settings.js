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