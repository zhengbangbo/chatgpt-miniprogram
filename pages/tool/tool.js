// pages/tool/tool.js
import { postPrompt } from "../../utils/prompts"
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

        // 微信小程序中 Textarea 的 placeholder font-size 在初始化的时候存在问题
        // 采用自定义 placeholder 可以更加灵活得解决问题
        showTextareaPlaceholder: true,

        // 页面样式
        pageStyle: "",
        rootFontSize: "",

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
        console.log(this.data.rootFontSize);
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
            path: `/pages/tool/tool?id=${this.data.id}`,
        };
    },
    handlePaste() {
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
    handleCopy() {
        const that = this
        wx.setClipboardData({ data: that.data.content })
    },
    handleStop() {
        this.socket.close({
            code: 4000,
            reason: "手动中止"
        })
    },
    handleFocus() {
        this.setData({
            showTextareaPlaceholder: false
        })
    },
    handleBlur() {
        if (this.data.askText.length == 0) {
            this.setData({
                showTextareaPlaceholder: true
            })
        }
    },
})
