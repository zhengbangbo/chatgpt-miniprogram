export function login() {
    wx.login({
        timeout: 10 * 1000,
        success({ code }) {
            console.log('code: ', code);
            wx.request({
                url: 'http://127.0.0.1:8000/login',
                data: { code },
                method: 'POST',
                success(res) {
                    if (res.statusCode == 200) {
                        wx.setStorage({ key: 'token', data: res.data.token })
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