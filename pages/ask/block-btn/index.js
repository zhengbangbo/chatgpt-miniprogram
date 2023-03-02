Component({
    properties: {
        loading: Boolean,
        isLogin: Boolean
    },
    methods: {
        onTap: function () {
            this.triggerEvent('ask')
        }
    }
});
