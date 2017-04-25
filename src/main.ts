import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app/app.component";

import "rxjs";

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
class GitWikiModule {}

document.addEventListener("DOMContentLoaded", ev => {
    platformBrowserDynamic().bootstrapModule(GitWikiModule);
});