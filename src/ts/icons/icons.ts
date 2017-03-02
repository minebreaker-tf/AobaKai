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
            fill-opacity="0.8">
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
            fill-opacity="0.8">
        <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"/>
    </svg>`
};
