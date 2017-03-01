declare module 'marked' {
    export = Marked.marked;
}

declare namespace Marked {

    /**
     * マークダウンの文字列をパースし、HTMLの文字列に変換します.
     *
     * @param markdown マークダウン文字列
     * @param options 設定パラメーター
     * @return parsed HTML文字列
     */
    function marked(markdown: string, options?: Options): string

    // declaration merging
    // http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
    namespace marked {

        function setOptions(options: Options): void;

        /**
         * パースされた要素を実際のHTMLに変換するクラスです。
         */
        class Renderer {

            /**
             * aタグ
             *
             * @param href
             * @param title
             * @param text
             */
            link(href: string, title: string, text: string): string

            code(code: string, lang: string, escaped: boolean): string

            options: any
        }

    }

    type Highlight = (code: string, lang?: string) => string

    interface Options {
        renderer?: marked.Renderer
        highlight?: Highlight
    }

}
