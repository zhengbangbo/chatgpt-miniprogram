// pages/tool/tool.js
import { postPrompt } from "../../utils/prompts"
import { initNotice } from '../../utils/notice'
import { initPageStyle } from "../../utils/settings"
import { websocketSend } from '../../utils/send'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 状态
        isError: false,
        showContent: false,
        loading: false,

        // 页面样式
        pageStyle: "",
        border: {
            color: 'red',
        },

        // 数据
        errorMessage: "",
        id: -1,
        title: "",
        description: "",
        content: "",
        askText: "",
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
        initPageStyle(this)
        if (!this.data.login) {
            const token = wx.getStorageSync('token')
            if (token) {
                this.setData({
                    login: true,
                })
            }
        }
        // initNotice(this)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        this.socket.close()
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
            path: `/pages/tool/tool?id=${this.data.id}`,
        };
    },
    handlePaste() {
        console.log("paste");
        const that = this
        wx.getClipboardData({
            success({ data }) {
                that.setData({
                    askText: data
                })
            }
        })
    },
    handleWsSend() {
        websocketSend(this, true)
    },
    handleSend() {
        const that = this
        this.setData({
            loading: true,
        })
        postPrompt(that, that.data.id, that.data.askText)
    },
    handleCopy() {
        const that = this
        console.log("copy");
        wx.setClipboardData({ data: that.data.content })
    }
})
