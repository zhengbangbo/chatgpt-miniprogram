const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
const items = new Array(12).fill({ label: '标题文字' }, 0, 12);

Page({
    offsetTopList: [],
    data: {
        sideBarIndex: 0,
        scrollTop: 0,
        categories: [],
    },
    onShareAppMessage() {
        return {
            title: 'AI 工具箱',
            path: '/pages/list/list',
        };
    },
    onShow() {
        const that = this
        wx.getStorage({
            key: "prompts",
            success({ data }) {
                console.log(data);
                const result = data.reduce((acc, cur) => {
                    const { id, name, category } = cur;
                    const foundCategory = acc.find((item) => item.title === category);
                    const newItem = { label: name, id };
                    if (foundCategory) {
                        foundCategory.items.push(newItem);
                    } else {
                        acc.push({ label: category, title: category, items: [newItem] });
                    } return acc;
                },
                    []
                );
                that.setData({ categories: result })
                console.log(result);
            }
        })
    },
    onSideBarChange(e) {
        const { value } = e.detail;
        console.log(value);
        this.setData({ sideBarIndex: value });
    },
    handelSelectTool(e) {
        console.log(e);
    }
});
