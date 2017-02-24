import Vue = require('vue');
import VueRouter = require('vue-router');

import articleView from './article';

Vue.use(VueRouter);

Vue.component('articleView', articleView);

const root: Vue.Component = {
    name: 'root',
    template: `
    <div>
        <a href="/foo">foo</a>
        <router-link to="/foo">Go to Foo</router-link><br />
        <article-view></article-view>
    </div>`
};

const router = new VueRouter({
    // mode: 'history',
    routes: [
        { path: '*', component: root }
    ]
});

new Vue({ router }).$mount('#app');
