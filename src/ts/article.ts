import Vue = require('vue');
import marked = require('marked');
import highlight = require('highlight.js');
import config from './config';

interface ArticleTitleData extends Vue {
    title: string
    site: string
}

const articleTitle: Vue.ComponentOptions<ArticleTitleData> = {
    name: 'article-title',
    props: ['site', 'title'],
    template: `
    <div>
        <h2 class="site">{{ site }}</h2>
        <h1>{{ title }}</h1>
    </div>`,
    watch: {
        'title': function () {
            document.getElementsByTagName('title').item(0).text = this.title + ' - ' + this.site;
        }
    }
};

interface ArticleContentData extends Vue {
    site: string;
    title: string
    url: string
    articleContent: Vue.Component
}

type ArticleSetter = (articleContent: Vue.Component) => void;
type ArticleTitleSetter = (title: string) => void;

const requestArticle = (path: string, setter: ArticleSetter, titleSetter: ArticleTitleSetter) => {
    // 末尾にスラッシュを追加する
    const base = config.base.charAt(config.base.length - 1) === '/' ?
        config.base :
        config.base + '/';
    const index = path === '/' ? 'index' : '';
    const addr = base + 'content' + path + index;

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
    props: ['site'],
    template: `
    <div class="container root">
        <article-title :site="site" :title="title"></article-title>
        <component v-bind:is="articleContent"></component>
    </div>`,
    data: () => {
        return {
            title: '',
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

// http://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
const rAbsoluteUrl = /^(?:[a-z]+:)?\/\//;

// エスケープ処理は実装しないので注意
class ModifiedRenderer extends marked.Renderer {

    link(href: string, title: string, text: string): string {

        const titleAttr = title ? ` title="${title}"` : '';

        // 相対URLの場合、Vueコンポーネントを利用する
        if (rAbsoluteUrl.test(href)) {
            return `<a href="${href}"${titleAttr} target="_blank">${text}</a>`;
        } else {
            return `<router-link to="${href}"${titleAttr}>${text}</router-link>`;
        }
    }

    code(code: string, lang: string, escaped: boolean): string {

        const hilight = () => {
            try {
                if (lang) {
                    return highlight.highlight(lang, code, true).value
                } else {
                    return highlight.highlightAuto(code).value
                }
            } catch (e) {
                console.error('Error while syntax highlighting');
                console.error(e);
                return code;
            }
        };

        if (lang) {
            return `<pre class="hljs"><code class="${this.options.langPrefix}${lang}">${hilight()}\n</code></pre>\n`;
        } else {
            return `<pre><code>${hilight()}\n</code></pre>`;
        }

    }
}

export default articleView;
