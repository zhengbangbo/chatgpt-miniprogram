// pages/tool/tool.js
import { postPrompt } from "../../utils/prompts"
import { initNotice } from '../../utils/notice'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isError: false,
        errorMessage: "",
        id: -1,
        title: "",
        description: "",
        showContent: false,
        content: "",
        askText: "",
        loading: false,
        border: {
            color: 'red',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const that = this
        const tool_id = parseInt(options.id)
        wx.getStorage({
            key: "prompts",
            success({ data }) {
                const prompts = data
                const prompt = prompts.find(item => item.id === tool_id)
                const { id, name, description } = prompt
                that.setData({ id, title: name, description })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (!this.data.login) {
            const token = wx.getStorageSync('token')
            if (token) {
                this.setData({
                    login: true,
                })
            }
        }
        initNotice(this)

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: `${this.data.title}`,
            path: `/pages/ask/ask?id=${this.data.id}`,
        };
    },
    handleSend() {
        const that = this
        this.setData({
            loading: true,
        })
        wx.getStorage({
            key: "askText",
            success({ data }) {
                postPrompt(that, that.data.id, data)
            }
        })
    },
    handleCopy() {
        const that = this
        console.log("copy");
        wx.setClipboardData({ data: that.data.content })
    }
})
