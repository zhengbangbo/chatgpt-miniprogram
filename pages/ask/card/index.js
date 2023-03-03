Component({
    data: {
        style: 'border-radius: 18rpx;',
    },
    methods: {
        onChange: function (element) {
            wx.setStorageSync('askText', element.detail.value)
        }
    }
});
