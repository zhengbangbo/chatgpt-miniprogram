import { setTabSelected } from "../../utils/tabBar"
import { login } from '../../utils/login'
import { BACKEND_URL_BASE } from '../../utils/config'
const app = getApp()

// pages/ask/ask.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        answerText: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

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
        // 设置 tabBar 显示状态
        setTabSelected(this, 0)
        if (!this.data.login) {
            const token = wx.getStorageSync('token')
            if (token) {
                this.setData({
                    login: true,
                })
            }
        }
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
        const token = wx.getStorageSync('token')
        if (!token) {
            login()
        }

        const that = this
        wx.getStorage({
            key: "askText",
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success(res) {
                wx.request({
                    url: `${BACKEND_URL_BASE}/ask_01`,
                    method: 'POST',
                    dataType: 'json',
                    enableHttp2: true,
                    data: {
                        text: res.data
                    },
                    header: {
                        'content-type': 'application/json',
                        'x-token': token
                    },
                    success(res) {
                        const data = res.data
                        console.log(data);
                        if (res.statusCode == '200') {
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