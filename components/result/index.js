Component({
    properties: {
        // 状态
        scrollLast: String,
        onStream: Boolean,

        // 页面样式
        scrollViewHeight: Number,

        // 数据
        messages: Array,
        content: String,
    },
    lifetimes: {

    },
    methods: {
        handleTextTap() {
            wx.setClipboardData({
                data: this.data.content,
            })
        }
    }
});
