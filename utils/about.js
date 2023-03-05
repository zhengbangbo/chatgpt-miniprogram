import { BACKEND_URL_BASE } from '../utils/config'

export function getAbout() {
    wx.request({
        url: `${BACKEND_URL_BASE}/about`,
        success({statusCode, data}) {
            if (statusCode == '200') {
                wx.setStorage({
                    key: 'about',
                    data: data.data.about
                })
            }
        }
      })
}