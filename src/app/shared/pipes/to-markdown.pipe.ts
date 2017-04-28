import * as marked from 'marked';
import { Pipe, PipeTransform } from '@angular/core';
import * as highlight from 'highlight.js';

@Pipe({ name: 'mdToHtml' })
export class MDToHtmlPipe implements PipeTransform {
    transform(markdown: string): string {
        return marked(markdown, {
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        });
    }
}
