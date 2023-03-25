// pages/tool/t-button/t-button.js
import { getToken } from '../../../utils/login'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        loading: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSend() {
            const that = this
            wx.getStorage({
                key: 'token',
                success() {
                    that.triggerEvent('send')
                },
                fail() {
                    getToken()
                    wx.showToast({
                      title: '请重试',
                      icon: 'success'
                    })
                }
            })
        },
        handlePaste() {
            this.triggerEvent('paste')
        },
        handleStop() {
            this.triggerEvent('stop')
        }
    }
})
