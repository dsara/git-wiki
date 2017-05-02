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

import {WikiPageService} from './shared/services';
import {HttpHeadersService} from "./shared/services";

import {AppRoutingModule} from './routes'

import {HomeComponent} from "./home/home.component";
import {OverviewModule} from './home/overview';
import {WikiPageModule} from './home/wikipage';
import {SideNavModule} from './home/shared/sidenav';

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
              OverviewModule,
              WikiPageModule,
              AppRoutingModule,
              SideNavModule],
    declarations: [HomeComponent],
    providers: [WikiPageService, HttpHeadersService],
    bootstrap: [HomeComponent]
})
class GitWikiModule {}

platformBrowserDynamic().bootstrapModule(GitWikiModule);