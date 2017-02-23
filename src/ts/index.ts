import Vue = require('vue');
import VueRouter = require('vue-router');

Vue.use(VueRouter);

const main = {
    name: 'main',
    template: `
    <div>
        {{ $route.path }}
        <div v-text="content"></div>
        <div v-html="content"></div>
    </div>`,
    watch: {
        '$route': (to: any, from: any) => {
            console.log(to);
            console.log(from);
        }
    },
    data: () => {
        return {
            content: '<b>Hoge</b>'
        }
    }
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '*', component: main }
    ]
});

const app = new Vue({ router }).$mount('#app');
