export const BACKEND_URL_BASE = 
    wx.getAccountInfoSync().miniProgram.envVersion === "release" ?
    // 正式版
        "https://cg-api.imzbb.cc" :
    // 体验版 + 开发版
        "http://192.168.31.236:4897"
export const APP_VERSION = "0.1.0"