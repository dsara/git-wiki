import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import {SideNavComponent} from './sidenav.component';
import {WikiPageService} from '../../../shared/services/wikipage.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, FormsModule, ReactiveFormsModule],
    declarations: [SideNavComponent],
    providers: [WikiPageService],
    exports: [SideNavComponent]
})
export class SideNavModule { }