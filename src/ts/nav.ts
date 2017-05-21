import Vue = require('vue');

import config from "./config";
import { homeIcon, upArrowIcon, fontSizeIcon, paletteIcon } from './icons/icons';

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

interface Clickable extends Vue {
    clicked: boolean
    show: string
}

const fontSize: Vue.ComponentOptions<Clickable> = {
    name: 'font-size',
    template: `
    <div class="inlined">
        <div class="inlined font-size-icon-popup" v-if="clicked">
            <div class="inlined cursor-pointer" v-on:click="setFontSize('80%')">
                <font-size-icon size="36" clazz="icon"></font-size-icon>
            </div>
            <div class="inlined cursor-pointer" v-on:click="setFontSize('100%')">
                <font-size-icon size="48" clazz="icon"></font-size-icon>
            </div>
            <div class="inlined cursor-pointer" v-on:click="setFontSize('130%')">
                <font-size-icon size="60" clazz="icon"></font-size-icon>
            </div>
        </div>
        <div class="inlined cursor-pointer" v-on:click="toggleMenu">
            <font-size-icon size="48" clazz="icon"></font-size-icon>
        </div>
    </div>`,
    props: ['show'],
    computed: {
        clicked: function () {
            return this.show == 'fontSize';
        }
    },
    methods: {
        toggleMenu: function () {
            this.$emit('pop', this.clicked ? '' : 'fontSize');
        },
        setFontSize: function (size) {
            document.body.style.fontSize = size;
            this.$emit('pop', '');
        }
    },
    components: {
        fontSizeIcon
    }
};

const theme: Vue.ComponentOptions<Clickable> = {
    name: 'theme',
    template: `
    <div class="inlined">
        <div class="inlined theme-icon-popup" v-if="clicked">
            <div class="inlined cursor-pointer" v-on:click="setStyleSheet('index.css')">
                <palette-icon size="48" clazz="icon-theme-normal"></palette-icon>
            </div>
            <div class="inlined cursor-pointer" 
                    v-on:click="setStyleSheet('index-dark.css')" 
                    title="Dark theme is an beta feature.">
                <palette-icon size="48" clazz="icon-theme-dark"></palette-icon>
            </div>
        </div>
        <div class="inlined cursor-pointer" v-on:click="toggleMenu">
            <palette-icon size="48" clazz="icon" opacity="0.4"></palette-icon>
        </div>
    </div>`,
    props: ['show'],
    computed: {
        clicked: function () {
            return this.show == 'theme';
        }
    },
    methods: {
        toggleMenu: function () {
            this.$emit('pop', this.clicked ? '' : 'theme');
        },
        setStyleSheet: function (name) {
            const url = config.base + name;
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', url);
            document.head.appendChild(link);
            this.$emit('pop', '');
        }
    },
    components: {
        paletteIcon
    }
};

const navPhone: Vue.ComponentOptions<any> = {
    name: 'nav-phone',
    template: `
    <div class="nav-phone transparent">
        <theme :show="target" v-on:pop="show"></theme>
        <font-size :show="target" v-on:pop="show"></font-size>
        <router-link to="/"><home-icon size="48" clazz="icon"></home-icon></router-link>
        <a href="#"><up-arrow-icon size="48" clazz="icon"></up-arrow-icon></a>
    </div>`,
    data: function () {
        return {
            target: ''
        }
    },
    methods: {
        show: function (target) {
            this.target = target;
        }
    },
    components: {
        theme,
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
