export const BACKEND_URL_BASE = wx.getAccountInfoSync().miniProgram.envVersion === "develop"
    ? "http://192.168.31.236:4897"  // 开发版
    // ? "https://cg-api2.imzbb.cc"  // 开发版
    : wx.getAccountInfoSync().miniProgram.envVersion === "trial"
        ? "https://cg-api2.imzbb.cc"  // 体验版
        : "https://cg-api2.imzbb.cc"; //正式版
export const WEBSOCKET_URL_BASE = wx.getAccountInfoSync().miniProgram.envVersion === "develop"
    ? "ws://192.168.31.236:4897"  // 开发版
    // ? "wss://cg-api2.imzbb.cc"  // 开发版
    : wx.getAccountInfoSync().miniProgram.envVersion === "trial"
        ? "wss://cg-api2.imzbb.cc"  // 体验版
        : "wss://cg-api2.imzbb.cc"; //正式版
export const APP_VERSION = "0.0.1"
