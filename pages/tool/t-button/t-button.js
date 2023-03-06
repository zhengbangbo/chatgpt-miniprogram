// pages/tool/t-button/t-button.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: String,
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
        handleTap() {
           if( this.data.text === "发送") {
               this.triggerEvent("send")
           } else if (this.data.text === "复制") {
               this.triggerEvent("copy")
           }
        }
    }
})
