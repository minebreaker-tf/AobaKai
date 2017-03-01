import Vue = require('vue');
import VueRouter = require('vue-router');

import articleView from './article';

Vue.use(VueRouter);

const root: any = {
    name: 'root',
    template: `
    <div>
        <article-view></article-view>
        <!--<router-link to="home">Home</router-link>-->
    </div>`,
    components: {
        articleView
    }
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', component: root }
    ]
});

new Vue({ router }).$mount('#app');
