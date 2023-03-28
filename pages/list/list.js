import { setTabSelected } from "../../utils/tabBar"
import { initPageStyle } from "../../utils/settings"

const image = 'https://tdesign.gtimg.com/miniprogram/images/example2.png';
const items = new Array(12).fill({ label: '标题文字' }, 0, 12);

Page({
    offsetTopList: [],
    data: {
        // 页面样式
        pageStyle: "",
        rootFontSize: "",

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
    onLoad() {
        const that = this
        const ready = setInterval(() => {
            wx.getStorage({
                key: "prompts",
                success({ data }) {
                    const result = data.reduce((acc, cur) => {
                        const { id, name, category, description } = cur;
                        const foundCategory = acc.find((item) => item.title === category);
                        const newItem = { label: name, id, description };
                        if (foundCategory) {
                            foundCategory.items.push(newItem);
                        } else {
                            acc.push({ label: category, title: category, items: [newItem] });
                        } return acc;
                    },
                        []
                    );
                    that.setData({ categories: result })
                    const query = wx.createSelectorQuery().in(that);
                    const { sideBarIndex } = that.data;

                    query
                        .selectAll('.title')
                        .boundingClientRect((rects) => {
                            that.offsetTopList = rects.map((item) => item.top);
                            that.setData({ scrollTop: rects[sideBarIndex].top });
                        })
                        .exec();
                    clearInterval(ready)
                },
            })

        }, 1000)
    },
    onShow() {
        initPageStyle(this)
        setTabSelected(this, 1)
    },
    onSideBarChange(e) {
        const { value } = e.detail;
        this.setData({ sideBarIndex: value, scrollTop: this.offsetTopList[value] });
    },
    onScroll(e) {
        const { scrollTop } = e.detail;
        const threshold = 50; // 下一个标题与顶部的距离

        if (scrollTop < threshold) {
            this.setData({ sideBarIndex: 0 });
            return;
        }

        const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

        if (index > -1) {
            this.setData({ sideBarIndex: index });
        }
    },
});
