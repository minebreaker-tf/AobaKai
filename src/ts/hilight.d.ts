// hilight.jsのnpmパッケージは容量がかなり大きいので、CDNを使うか、
// プリビルドjsを用意するか、毎回ビルドする仕組みを作るべきかもしれない(が、大変)

declare module 'highlight.js' {
    export = HighlightJs.Hljs;
}

declare namespace HighlightJs {

    class Hljs {

        static highlight(name: string, value: string, ignore_illegals?: boolean, continuation?: any): HighlightedObject

        static highlightAuto(value: string, languageSubset?: string[]): HighlightedObject

    }

    interface HighlightedObject {
        language: string
        relevance: number
        value: string
        top?: any
        second_best?: HighlightedObject
    }

}
