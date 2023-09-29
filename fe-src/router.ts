import { Router } from "@vaadin/router";

const router = new Router(document.querySelector('.root'));

router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/interests', component: 'interests-page' },
    { path: '/channels', component: 'channels-page' }
]);