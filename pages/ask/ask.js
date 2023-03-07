import { flushMessages, clearMessages } from '../../utils/messages'
import { BACKEND_URL_BASE } from '../../utils/config'
import { initNotice } from '../../utils/notice'

// pages/ask/ask.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isError: false,
        errorMessage: "",
        loading: false,
        messages: [],
        askText: "",
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
        if (!this.data.login) {
            const token = wx.getStorageSync('token')
            if (token) {
                this.setData({
                    login: true,
                })
            }
        }
        initNotice(this)
        // 刷新 messages
        flushMessages(this)
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

    Send() {
        const that = this
        try {
            console.log('Send');
            const token = wx.getStorageSync('token')
            const askText = wx.getStorageSync('askText')

            if (askText === '') {
                throw Error('请输入文字')
            }
            const old_messages = JSON.parse(wx.getStorageSync('messages'))
            const new_user_message = { "role": "user", "content": askText }
            const messages = [...old_messages, new_user_message]

            console.log();
            wx.request({
                url: `${BACKEND_URL_BASE}/api/v1/ask`,
                method: 'POST',
                dataType: 'json',
                enableHttp2: true,
                data: {
                    text: JSON.stringify(messages)
                },
                header: {
                    'content-type': 'application/json',
                    'x-token': token
                },
                success({ statusCode, data }) {
                    if (statusCode == '200') {
                        switch (data.code) {
                            case 200:
                                const new_assistant_message = {
                                    "role": "assistant",
                                    "content": data.data.answer
                                }
                                const new_messages = [...messages, new_assistant_message]
                                that.setData({ messages: new_messages })
                                wx.setStorageSync('messages', JSON.stringify(new_messages))
                                break;
                            case 1101:
                            case 1102:
                                wx.clearStorageSync("token")
                                wx.showToast({
                                    title: data.message,
                                    icon: 'error'
                                })
                                break;
                            case 2001:
                                wx.showToast({
                                    title: data.message,
                                    icon: 'success'
                                })
                                break
                            case 1201:
                            case 1501:
                            case 1502:
                            default:
                                wx.showToast({
                                    title: data.message,
                                    icon: 'error'
                                })
                                break;
                        }
                        that.setData({ loading: false, askText: "" })
                        console.log(data);
                    } else {
                        wx.setStorage({
                            key: 'messages',
                            data: '[]'
                        })
                        wx.showToast({
                            title: '出错了',
                            icon: 'error'
                        })
                        that.setData({ loading: false })
                    }
                },
                fail() {
                    wx.showToast({
                        title: '出错了',
                        icon: 'error'
                    })
                    that.setData({ loading: false })
                }
            })
        } catch ({ message }) {
            wx.showToast({
                title: message,
                icon: 'error'
            })
            that.setData({ loading: false })
        } finally {
        }
    },
    Clear() {
        clearMessages(this)
        wx.setStorage({
            key: 'messages',
            data: '[]'
        })
    },
    handleMore() {
        wx.navigateTo({
            url: '/pages/list/list',
        })
    }
})