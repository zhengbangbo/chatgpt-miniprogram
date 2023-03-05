Component({
    properties: {
        role: String,
        content: String
    },
    lifetimes: {
        attached() {
            // console.log(content);
        }
    }
});
