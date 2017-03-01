import Vue = require('vue');
import marked = require('marked');

interface ArticleTitleData extends Vue {
    title: string
}

const articleTitle: Vue.ComponentOptions<ArticleTitleData> = {
    name: 'article-title',
    props: ['title'],
    template: `<h1>{{ title }}</h1>`,
    watch: {
        'title': function () {
            document.getElementsByTagName('title').item(0).text = this.title;
        }
    }
};

interface ArticleContentData extends Vue {
    title: string
    url: string
    articleContent: Vue.Component
}

type ArticleSetter = (articleContent: Vue.Component) => void;
type ArticleTitleSetter = (title: string) => void;

function requestArticle(path: string, setter: ArticleSetter, titleSetter: ArticleTitleSetter) {
    const index = path === '/' ? 'index' : '';
    const addr = '/content' + path + index;

    // target = es5 だとPromise.allが使えない... Babelいれる?
    fetch(addr + '.md')
        .then(r => {
            if (r.ok) {
                return r.text();
            } else {
                return `<div>We're sorry, something is wrong with the server.</div>`
            }
        })
        .then(t => {
            const raw = '<div>' + marked(t, { renderer: new ModifiedRenderer() });
            setter({
                name: 'article-content',
                template: `<div> ${raw} </div>`
            });
        });

    fetch(addr + '.json')
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                return {
                    title: `${r.status} ${r.statusText}`
                };
            }
        })
        .then((obj: any) => {
            titleSetter(obj.title);
        });
};

const articleView: Vue.ComponentOptions<ArticleContentData> = {
    name: 'article-view',
    props: [],
    template: `
    <div>
        <article-title :title="title"></article-title>
        <component v-bind:is="articleContent"></component>
    </div>`,
    data: () => {
        return {
            title: 'hoge',
            articleContent: {
                name: 'default-article-content',
                template: '<div></div>'
            }
        }
    },
    beforeCreate: function () {
        requestArticle(this.$route.path, (article) => {
            this.articleContent = article;
        }, (title) => {
            this.title = title;
        });
    },
    watch: {
        '$route': function (to: any, from: any) { // TODO Type
            requestArticle(to.path, (article) => {
                this.articleContent = article;
            }, (title) => {
                this.title = title;
            });
        }
    },
    components: {
        articleTitle
    }
};

class ModifiedRenderer extends marked.Renderer {
    // エスケープ処理は実装しないので注意
    link(href: string, title: string, text: string): string {

        // スラッシュで始まるURLは内部のリンクとみなし、Vueコンポーネントを利用する
        if (href.charAt(0) === '/') {
            let out = '<router-link to="' + href + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += '>' + text + '</router-link>';
            return out;
        } else {
            let out = '<a href="' + href + '"';
            if (title) {
                out += ' title="' + title + '"';
            }
            out += ' target="_blank">' + text + '</a>';
            return out;
        }
    }
}

export default articleView;
