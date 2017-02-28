declare module 'marked' {
    export = Marked.marked;
}

declare namespace Marked {

    /**
     * マークダウンの文字列をパースし、HTMLの文字列に変換します.
     *
     * @param markdown マークダウン文字列
     * @return parsed HTML文字列
     */
    function marked(markdown: string, options?: Options): string

    // declaration merging
    // http://stackoverflow.com/questions/12766528/build-a-function-object-with-properties-in-typescript
    namespace marked {
        function setOptions(options: Options): void;
    }

    interface Options {
        renderer?: Renderer
    }

    class Renderer {
        link(href: string, title: string, text: string): void
    }

}
