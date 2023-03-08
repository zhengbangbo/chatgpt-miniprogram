import { login } from './utils/login'
import { getPrompts } from './utils/prompts';
import { initMessages } from './utils/messages'

App({
    onLaunch() {
        login();
        initMessages();
        getPrompts();
    },
    onShow() {
    }
});

//# sourceMappingURL=app.js.map
