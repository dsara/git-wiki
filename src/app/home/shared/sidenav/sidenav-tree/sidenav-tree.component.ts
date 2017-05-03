import { Component, OnInit, ViewContainerRef, Input } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";

import {IWikiPage, IWikiNav} from "../../../../../interfaces";
import {WikiPageService} from '../../../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'side-nav-tree',
    templateUrl: 'sidenav-tree.component.pug',
    styleUrls: ["sidenav-tree.component.scss"]
})

export class SideNavTreeComponent implements OnInit {
    @Input() items: IWikiNav[] = [];
    showChildren: boolean = false;
 
    constructor(private wikiPageService: WikiPageService, private router: Router) {

    }

    ngOnInit(): void {

    }

    toggleChildren(wikiNavItem: IWikiNav) {
        wikiNavItem.showChildren = !wikiNavItem.showChildren;
    }
};