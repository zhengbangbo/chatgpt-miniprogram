Component({
    properties: {
        loading: Boolean
    },
    methods: {
        onTap: function () {
            this.triggerEvent('ask')
        }
    }
});
