// using Google Material Icons which is available under Apache License v2.
// https://material.io/icons/

import Vue = require('vue');

export const homeIcon: Vue.ComponentOptions<Vue> = {
    name: 'home-icon',
    props: ['size', 'clazz'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :class="clazz"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"/>
    </svg>`
};

export const upArrowIcon: Vue.ComponentOptions<Vue> = {
    name: 'up-arrow-icon',
    props: ['size', 'clazz'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :class="clazz"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"/>
    </svg>`
};

export const fontSizeIcon: Vue.ComponentOptions<Vue> = {
    name: 'font-size-icon',
    props: ['size', 'clazz'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :class="clazz"
            viewBox="0 0 48 48"
            fill-opacity="0.4">
        <path d="M18 8v6h10v24h6V14h10V8H18zM6 24h6v14h6V24h6v-6H6v6z"/>
    </svg>`
};

export const paletteIcon: Vue.ComponentOptions<Vue> = {
    name: 'palette-icon',
    props: ['size', 'clazz', 'opacity'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :fill-opacity="opacity"
            :class="clazz"
            viewBox="0 0 48 48">
        <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    </svg>`
};

export const informationIcon: Vue.ComponentOptions<Vue> = {
    name: 'information-icon',
    props: ['size', 'clazz'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :class="clazz"
            viewBox="0 0 48 48">
        <path d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/>
    </svg>`
};

export const closeIcon: Vue.ComponentOptions<Vue> = {
    name: 'close-icon',
    props: ['size', 'clazz'],
    template: `
    <svg xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :class="clazz"
            viewBox="0 0 48 48">
        <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
    </svg>`
};
