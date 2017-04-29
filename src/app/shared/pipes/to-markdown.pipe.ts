import * as marked from 'marked';
import { Pipe, PipeTransform } from '@angular/core';
import * as hljs from 'highlight.js';

@Pipe({ name: 'mdToHtml' })
export class MDToHtmlPipe implements PipeTransform {
    private renderer = new marked.Renderer();

    constructor() {
        this.renderer.code = function(code, language): string {
            return '<pre class="hljs"><code>' +
                (language ? (hljs.getLanguage(language) ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value) : hljs.highlightAuto(code).value) +
                '</code></pre>';
        }
    }

    transform(markdown: string): string {
        return marked(markdown, {
            renderer: this.renderer
            // highlight: function (code) {
            //     return highlight.highlightAuto(code).value;
            // }
        });
    }
}
