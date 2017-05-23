import Vue = require('vue');
import VueRouter = require('vue-router');

import articleView from './article';
import notification from './notification';
import { navi } from './nav';
import config from './config';

Vue.use(VueRouter);

interface RootState extends Vue {
    title: string
    notification: string
}

const root: Vue.ComponentOptions<RootState> = {
    name: 'root',
    template: `
    <div>
        <notification :notification="notification"></notification>
        <article-view :site="title"></article-view>
        <navi></navi>
    </div>`,
    components: {
        articleView,
        navi,
        notification
    },
    data: () => {
        return {
            title: '',
            notification: ''
        };
    },
    beforeCreate: function () {
        fetch(`${config.base}content/settings.json`).then(response => {
            if (response.ok) {
                response.json().then(setting => {
                    this.title = setting.title;
                    this.notification = setting.notification;
                });
            } else {
                console.error('Failed to load settings.json');
                console.error(response);
            }
        });
    }
};

const router = new VueRouter({
    mode: 'history',
    base: config.base,
    routes: [
        { path: '/index.html', redirect: '/' },
        { path: '/index.htm', redirect: '/' },
        { path: '*', component: root }
    ],
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

new Vue({ router }).$mount('#app');
