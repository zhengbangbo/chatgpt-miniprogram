import { login } from './utils/login'
import { initSettings } from './utils/settings'

App({
    onLaunch() {
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
        })

        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            wx.showToast({
                title: '下载失败',
                icon: 'error'
            })
        })
        login();
    },
    onShow() {
        initSettings();
    },
    env: (function () {
        let { miniProgram } = wx.getAccountInfoSync()
        return miniProgram.envVersion
    }()),
    getSystemInfo() {
        let info = wx.getSystemInfoSync()
        // 采用了缓存的机制，第一次调用时，调用getSystemInfoSync获取，第二次就直接返回缓存的设备信息了
        this.getSystemInfo = () => info
        return info
    }
});

//# sourceMappingURL=app.js.map
