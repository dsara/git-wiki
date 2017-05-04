import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule, MdAutocompleteModule, MdChipsModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {MDToHtmlPipe} from '../../shared/pipes/to-markdown.pipe';

import {WikiPageComponent} from './wikipage.component';
import {WikiPageService, WikiTagService} from '../../shared/services';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, MdAutocompleteModule, MdChipsModule, FormsModule, ReactiveFormsModule],
    declarations: [WikiPageComponent, MDToHtmlPipe],
    providers: [WikiPageService, WikiTagService],
    exports: [WikiPageComponent]
})
export class WikiPageModule { }