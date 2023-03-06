import { BACKEND_URL_BASE } from '../utils/config'

export function getPrompts() {
    wx.request({
        url: `${BACKEND_URL_BASE}/prompts`,
        success({ statusCode, data }) {
            if (statusCode == '200') {
                wx.setStorage({
                    key: 'prompts',
                    data: data.data.prompts
                })
            }
        }
    })
}

export function postPrompt(that, id, prompt) {
    try {
        const token = wx.getStorageSync('token')
        wx.request({
            url: `${BACKEND_URL_BASE}/prompts`,
            method: 'POST',
            data: JSON.stringify({ 
                id,
                prompt
             }),
            dataType: 'json',
            enableHttp2: true,
            header: {
                'content-type': 'application/json',
                'x-token': token
            },
            success({ statusCode, data }) {
                if (statusCode == '200') {
                    that.setData({
                        content: data.data.answer
                    })
                }
                that.setData({
                    loading: false
                })
            }
        })
 
    } catch (error) {

    }
} 
