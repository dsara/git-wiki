import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule, MdAutocompleteModule, MdChipsModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {UserComponent} from './user.component';
import {WikiUserService} from './user.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, MdAutocompleteModule, MdChipsModule, FormsModule, ReactiveFormsModule],
    declarations: [UserComponent],
    providers: [WikiUserService],
    exports: [UserComponent]
})
export class WikiUserModule { }