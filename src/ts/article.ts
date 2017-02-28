import Vue = require('vue');
import marked = require('marked');

import ajax from './fetch';

const articleTitle: Vue.ComponentOptions<Vue> = {
    name: 'article-title',
    props: ['title'],
    template: `<h1>{{ title }}</h1>`
};

const articleContent: Vue.ComponentOptions<Vue> = {
    name: 'article-content',
    props: ['content'],
    template: `
    <div>
        <div v-html="content"></div>
        <!--<div v-text="content"></div>-->
    </div>`
};

interface ArticleContentData extends Vue {
    title: string,
    url: string,
    contentRawHtml: string
}

const articleView: Vue.ComponentOptions<ArticleContentData> = {
    name: 'article-view',
    props: [],
    template: `
    <div>
        <article-title :title="title"></article-title>
        <article-content :content="contentRawHtml" class="marked"></article-conent>
    </div>`,
    data: () => {
        return {
            title: 'hoge',
            contentRawHtml: ''
        }
    },
    beforeCreate: function () {
        console.log(this.$route.path);
        const index = this.$route.path === '/' ? 'index.md' : '';
        const addr = 'content' + this.$route.path + index;
        ajax(addr, response => {
            console.log(response);
            this.contentRawHtml = marked(response);
            const list = document.querySelectorAll('a');
            console.log(list);
            for (let i = 0; list.length; i++) {
                const e = list.item(i);
                console.log(e);
            }
        }, (status: number, desc: string) => {
            this.title = `${status} ${desc}`;
        });
    },
    watch: {
        '$route': (to: any, from: any) => {
            console.log(to);
            console.log(from);
        }
    },
    components: {
        articleTitle: articleTitle,
        articleContent: articleContent
    }
};

export default articleView;
