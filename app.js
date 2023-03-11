import { login } from './utils/login'
import { getPrompts } from './utils/prompts';

App({
    onLaunch() {
        login();
        getPrompts();
    },
    onShow() {

    }
});

//# sourceMappingURL=app.js.map
