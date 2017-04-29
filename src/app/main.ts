import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MarkdownToHtmlModule} from 'markdown-to-html-pipe';
import {MDToHtmlPipe} from './shared/pipes/to-markdown.pipe';
import {WikiPageService} from './shared/services';
import {HttpHeadersService} from "./shared/services";

import {AppComponent} from "./app.component";

import "rxjs";

require("../styles/global.scss");

@NgModule({
    imports: [BrowserModule,
              BrowserAnimationsModule,
              MdButtonModule,
              MdSidenavModule,
              MdInputModule,
              MdToolbarModule,
              FlexLayoutModule,
              FormsModule,
              HttpModule,
              MarkdownToHtmlModule],
    declarations: [AppComponent, MDToHtmlPipe],
    providers: [WikiPageService, HttpHeadersService],
    bootstrap: [AppComponent]
})
class GitWikiModule {}

platformBrowserDynamic().bootstrapModule(GitWikiModule);