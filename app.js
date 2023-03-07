import { login } from './utils/login'
import { getPrompts } from './utils/prompts';
import { initMessages } from './utils/messages'

App({
    onLaunch() {
        initMessages();
        login();
        getPrompts();
    },
    onShow() {
    }
});

//# sourceMappingURL=app.js.map
