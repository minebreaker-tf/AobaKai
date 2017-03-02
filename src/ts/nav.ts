import Vue = require('vue');

import { homeIcon, upArrowIcon } from './icons/icons';

const navPc: Vue.ComponentOptions<Vue> = {
    name: 'nav-pc',
    template: `
    <div>
        <div class="nav-pc">
            <router-link to="/"><h2 class="nav-title">AobaKai</h2></router-link>
            <div>
                <div v-for="link in links">
                    <router-link to="/"><home-icon size="48"></home-icon></router-link>
                </div>
            </div>
        </div>
        <div class="nav-phone">
            <a href="#"><up-arrow-icon size="48"></up-arrow-icon></a>
        </div>
    </div>`,
    components: {
        homeIcon,
        upArrowIcon
    }
};

const navPhone: Vue.ComponentOptions<Vue> = {
    name: 'nav-phone',
    template: `
    <div class="nav-phone">
        <router-link to="/"><home-icon size="48"></home-icon></router-link>
        <a href="#"><up-arrow-icon size="48"></up-arrow-icon></a>
    </div>`,
    components: {
        homeIcon,
        upArrowIcon
    }
};

export const navi: Vue.ComponentOptions<Vue> = {
    name: 'nav',
    template: `
    <div>
        <nav-phone></nav-phone>
    </div>`,
    components: {
        navPhone
    }
};
