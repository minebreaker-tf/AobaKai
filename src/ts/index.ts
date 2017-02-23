import Vue = require('vue');
import VueRouter = require('vue-router');

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
        { path: '*', component: { template: '<div>not found</div>' } }
    ]
});

const app = new Vue({ router }).$mount('#app');
