Component({
    properties: {
        scrollViewHeight: Number,
        scrollLast: String,
        messages: Array,
        content: String,
        onStream: Boolean,
    },
    lifetimes: {
        attached() {
            // console.log(content);
        }
    },
    methods: {
        handleTextTap() {
            wx.setClipboardData({
                data: this.data.content,
            })
        }
    }
});
