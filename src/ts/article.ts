import Vue = require('vue');

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
        <article-content :content="contentRawHtml"></article-conent>
    </div>`,
    data: () => {
        return {
            title: 'hoge',
            contentRawHtml: ''
        }
    },
    beforeCreate: function () {
        ajax('text.html', response => {
            console.log(this.$route.path);
            console.log(response);
            this.contentRawHtml = response;
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
