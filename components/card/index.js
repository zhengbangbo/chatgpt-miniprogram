Component({
    properties: {
        askText: String
    },
    methods: {
        onChange: function (element) {
            wx.setStorageSync('askText', element.detail.value)
        }
    }
});
