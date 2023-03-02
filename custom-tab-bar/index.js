Component({
    data: {
        selectedValue: 0,
        list: [
            { value: 0, icon: 'chat', ariaLabel: '问答', pagePath: '/pages/ask/ask' },
            { value: 0, icon: 'app', ariaLabel: '软件', pagePath: '/pages/home/home' },
        ],
    },

    methods: {
        onChange(e) {
            const label = e.detail.value
            wx.switchTab({
              url: this.data.list[label].pagePath,
            })
        },
    },
});
