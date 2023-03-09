// pages/tool/tool.js
import { postPrompt } from "../../utils/prompts"
import { initNotice } from '../../utils/notice'
import WxSocket from '../../utils/wxsocket'

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
        
        this.socket = new WxSocket({
            url: 'ws://localhost:4897/ws'
        })

        this.socket.on('open', () => {
            console.log('WebSocket 已连接')
        })

        this.socket.on('message', (data) => {
            console.log('收到消息：', data)
            this.setData({
                content: this.data.content + data,
                showContent: true
            })
        })

        this.socket.on('close', (e) => {
            console.log('WebSocket 已关闭：', e)
        })

        this.socket.on('error', (e) => {
            console.log('WebSocket 出错：', e)
        })
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
        this.socket.close()
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
    handleWsSend() {
        const r = {
            id: 1,
            messages: this.data.askText
        }
        this.socket.send(r)
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
