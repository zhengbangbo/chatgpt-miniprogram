Component({
    data: {
    },
    properties: {
        role: String,
        content: String
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
