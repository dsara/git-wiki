import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {MDToHtmlPipe} from '../../shared/pipes/to-markdown.pipe';

import {WikiPageComponent} from './wikipage.component';
import {WikiPageService} from '../../shared/services/wikipage.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, FormsModule, ReactiveFormsModule],
    declarations: [WikiPageComponent, MDToHtmlPipe],
    providers: [WikiPageService],
    exports: [WikiPageComponent]
})
export class WikiPageModule { }