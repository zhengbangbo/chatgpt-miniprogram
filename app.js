App({

    onShow() {
        const token = wx.getStorageSync('token')

        if(!token) {
            wx.login({
              timeout: 10 * 1000,
              success({ code }) {
                  wx.request({
                    url: 'https://cg-api.imzbb.cc/login',
                    data: { code },
                    method: 'POST',
                    success(res) {
                        if(res.statusCode === '200') {
                            wx.setStorage('token', res.data.token)
                        } else {
                            wx.showToast({
                              title: '登录失败',
                              icon: 'error'
                            })
                        }
                    }
                  })
              }
            })
        }
    },
});

//# sourceMappingURL=app.js.map
