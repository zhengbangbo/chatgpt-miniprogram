// pages/tool/t-button/t-button.js
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
            console.log('send');
            this.triggerEvent('send')
        },
        handlePaste() {
            console.log('paste');
            this.triggerEvent('paste')
        }
    }
})
