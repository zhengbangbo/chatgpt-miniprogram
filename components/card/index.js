Component({
    properties: {
        askText: String,
        maxLength: Number
    },
    methods: {
        onChange: function (element) {
            wx.setStorageSync('askText', element.detail.value)
        }
    }
});
