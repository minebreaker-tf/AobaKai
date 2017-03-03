import Vue = require('vue');
import VueRouter = require('vue-router');

import articleView from './article';
import {navi} from './nav';
import config from './config';

Vue.use(VueRouter);

interface RootState extends Vue {
    title: string
}

const root: Vue.ComponentOptions<RootState> = {
    name: 'root',
    template: `
    <div>
        <article-view :site="title"></article-view>
        <navi></navi>
    </div>`,
    components: {
        articleView,
        navi
    },
    data: () => {
        return {
            title: ''
        };
    },
    beforeCreate: function () {
        fetch(`${config.base}content/settings.json`).then(response => {
            if (response.ok) {
                response.json().then(setting => {
                    this.title = setting.title;
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
