Component({
    data: {
        style: 'border-radius: 18rpx;',
    },
    methods: {
        onChange: function (element) {
            wx.setStorage({
                key: "askText",
                data: element.detail.value,
                encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
                success() {
                    wx.getStorage({
                        key: "askText",
                        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
                        success(res) {
                            console.log(res.data)
                        }
                    })
                }
            })
        }
    }
});
