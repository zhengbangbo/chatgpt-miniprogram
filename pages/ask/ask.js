import { setTabSelected, hideTabBarDebounce, showTabBarDebounce } from "../../utils/tabBar"
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
        yStart: 0,
        showTabBarFlag: true
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

    handletouchmove: function (event) {
        const currentY = event.changedTouches[0].clientY
        const detla = currentY - this.data.yStart
        if (detla > 75) {
            if (!this.data.showTabBarFlag) {
                showTabBarDebounce(this)
            }
        } else if (detla > -75) {
        } else {
            if (this.data.showTabBarFlag) {
                hideTabBarDebounce(this)
            }
        }
    },

    handletouchstart: function (event) {
        this.data.yStart = event.changedTouches[0].clientY
    },

    Ask: function () {
        const token = wx.getStorageSync('token')
        if (!token) {
            login()
        }
        const that = this
        const askText = wx.getStorageSync('askText')
        if (askText) {
            wx.request({
                url: `${BACKEND_URL_BASE}/api/v1/ask`,
                method: 'POST',
                dataType: 'json',
                enableHttp2: true,
                data: {
                    text: askText
                },
                header: {
                    'content-type': 'application/json',
                    'x-token': token
                },
                success(res) {
                    if (res.statusCode == '200') {
                        switch (res.data.code) {
                            case 200:
                                that.setData({ answerText: res.data.data.answer, loading: false })
                                that.setData({ loading: false })
                                break;
                            case 1101:
                            case 1102:
                                wx.clearStorageSync("token")
                                wx.showToast({
                                    title: res.data.message,
                                    icon: 'error'
                                })
                                that.setData({ loading: false })
                                break;
                            case 1201:
                                wx.showToast({
                                    title: res.data.message,
                                    icon: 'error'
                                })
                                that.setData({ loading: false })
                                break;
                        }
                        console.log(res.data);
                    } else {
                        wx.showToast({
                            title: '出错了',
                            icon: 'error'
                        })
                        that.setData({ loading: false })
                    }
                },
                fail(err) {
                    wx.showToast({
                        title: '出错了',
                        icon: 'error'
                    })
                    that.setData({ loading: false })
                }
            })
        } else {
            wx.showToast({
                title: '请先输入问题',
                icon: 'error'
            })
            that.setData({ loading: false })
        }
    },
})