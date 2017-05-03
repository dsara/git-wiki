import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MdButtonModule, MdSidenavModule, MdToolbarModule, MdInputModule, MdListModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {SideNavComponent} from './sidenav.component';
import {SideNavTreeComponent} from './sidenav-tree';
import {WikiPageService} from '../../../shared/services/wikipage.service';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MdButtonModule, MdInputModule, FormsModule, ReactiveFormsModule, MdListModule, RouterModule],
    declarations: [SideNavComponent, SideNavTreeComponent],
    providers: [WikiPageService],
    exports: [SideNavComponent]
})
export class SideNavModule { }