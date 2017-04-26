import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule} from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";

import "rxjs";

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, MdButtonModule, FlexLayoutModule, HttpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
class GitWikiModule {}

platformBrowserDynamic().bootstrapModule(GitWikiModule);