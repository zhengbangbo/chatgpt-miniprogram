import { clearMessages, saveMessages, loadMessages } from '../../utils/messages'
import { loadToken } from '../../utils/token'
import { setTabSelected } from "../../utils/tabBar"
import { initPageStyle } from '../../utils/settings'
import { websocketSend } from '../../utils/send'

// pages/ask/ask.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 状态
        showIntro: true,
        loading: false,
        isError: false,
        onStream: false,
        scrollLast: "",

        // 微信小程序中 Textarea 的 placeholder font-size 在初始化的时候存在问题
        // 采用自定义 placeholder 可以更加灵活得解决问题
        showTextareaPlaceholder: true,

        // 页面样式
        pageStyle: "",
        rootFontSize: "",
        scrollViewHeight: 300,

        // 数据
        messages: [],
        errorMessage: "",
        askText: "",
        content: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        let scrollViewHeight = getApp().getSystemInfo().windowHeight
        this.setData({
            scrollViewHeight,
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
        loadMessages(this)
        setTabSelected(this, 0)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        saveMessages(this)
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
            title: 'AI 智能问答',
            path: '/pages/ask/ask',
        };
    },

    handleWsSend() {
        websocketSend(this)
    },
    handleClear() {
        this.setData({
            showIntro: true
        })
        clearMessages(this)
    },
    handleStop() {
        this.setData({
            loading: false,
            onStream: false
        })
        this.socket.close({
            code: 4000,
            reason: '手动中断'
        })
    },
    handleFeedback() {
        wx.openCustomerServiceChat()
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
    handleInput() {
        console.log('input');
        if (this.data.askText.length >= 300) {
            wx.showToast({
                title: '不能超过300字',
                icon: 'error'
            })
        }
    }
})
