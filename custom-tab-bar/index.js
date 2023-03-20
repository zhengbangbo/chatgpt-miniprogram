Component({
    data: {
        selectedValue: 0,
        list: [
            { value: 0, icon: 'chat', label: '问答', ariaLabel: '问答', pagePath: '/pages/ask/ask' },
            { value: 1, icon: 'app', label: '工具箱', ariaLabel: '工具箱', pagePath: '/pages/list/list' },
            { value: 2, icon: 'user-circle', label: '我的', ariaLabel: '我的', pagePath: '/pages/home/home'}
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