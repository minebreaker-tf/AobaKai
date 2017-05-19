import Vue = require('vue');

import { homeIcon, upArrowIcon, fontSizeIcon } from './icons/icons';

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

interface FontSizeData extends Vue {
    clicked: boolean
}

const fontSize: Vue.ComponentOptions<FontSizeData> = {
    name: 'font-size',
    template: `
    <div class="inlined">
        <div class="inlined font-size-icon-popup" v-if="clicked">
            <div class="inlined" v-on:click="setFontSize('80%')">
                <font-size-icon size="36"></font-size-icon>
            </div>
            <div class="inlined" v-on:click="setFontSize('100%')">
                <font-size-icon size="48"></font-size-icon>
            </div>
            <div class="inlined" v-on:click="setFontSize('130%')">
                <font-size-icon size="60"></font-size-icon>
            </div>
        </div>
        <div class="inlined" v-on:click="toggleMenu">
            <font-size-icon size="48"></font-size-icon>
        </div>
    </div>`,
    data: function () {
        return {
            clicked: false
        };
    },
    methods: {
        toggleMenu: function () {
            this.clicked = !this.clicked;
        },
        setFontSize: function (size) {
            console.log("size: " + size);
            document.body.style.fontSize = size;
            this.clicked = false;
        }
    },
    components: {
        fontSizeIcon
    }
};

const navPhone: Vue.ComponentOptions<Vue> = {
    name: 'nav-phone',
    template: `
    <div class="nav-phone">
        <font-size></font-size>
        <router-link to="/"><home-icon size="48"></home-icon></router-link>
        <a href="#"><up-arrow-icon size="48"></up-arrow-icon></a>
    </div>`,
    components: {
        fontSize,
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
