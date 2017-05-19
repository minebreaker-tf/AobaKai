// using Google Material Icons which is available under Apache License v2.
// https://material.io/icons/

import Vue = require('vue');

export const homeIcon: Vue.ComponentOptions<Vue> = {
    name: 'home-icon',
    props: ['size'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"/>
    </svg>`
};

export const upArrowIcon: Vue.ComponentOptions<Vue> = {
    name: 'up-arrow-icon',
    props: ['size'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"/>
    </svg>`
};

export const fontSizeIcon: Vue.ComponentOptions<Vue> = {
    name: 'font-size-icon',
    props: ['size'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M18 8v6h10v24h6V14h10V8H18zM6 24h6v14h6V24h6v-6H6v6z"/>
    </svg>`
};
