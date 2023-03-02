import { setTabSelected } from "../../utils/tabBar"

// pages/ask/ask.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        answerText: "",
        token: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if(!this.data.token) {
            const token = wx.getStorageSync('token')
            if(token) {
                this.setData({
                    token: wx.getStorageSync('token'),
                    btnText: '提问'
                })
            }
        }
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
        setTabSelected(this, 0)
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
            title: 'AI 智能问答',
            path: '/pages/ask/ask',
        };
    },

    Ask: function () {
        if(!this.data.token) {
            return
        }

        const that = this
        this.setData({ loading: true })
        wx.getStorage({
            key: "askText",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success(res) {
                wx.request({
                    url: 'https://cg-api.imzbb.cc/ask',
                    method: 'POST',
                    dataType: 'json',
                    enableHttp2: true,
                    data: {
                        text: res.data
                    },
                    header: {
                        'content-type': 'application/json',
                        authorization: token
                    },
                    success(res) {
                        const data = res.data
                        console.log(data);
                        if(res.statusCode === '200') {
                            that.setData({ answerText: res.data.answer, loading: false })
                        } else {
                            wx.showToast({
                                title: '出错了',
                                icon: 'error'
                            })
                        }
                    }
                })
            }
        })
    },
})