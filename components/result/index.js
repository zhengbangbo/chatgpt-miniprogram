Component({
    properties: {
        // 状态
        scrollLast: String,
        onStream: Boolean,

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
