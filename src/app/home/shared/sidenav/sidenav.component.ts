import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";

import {IWikiPage, IWikiNav} from "../../../../interfaces";
import {WikiPageService} from '../../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'git-wiki-sidenav',
    encapsulation: ViewEncapsulation.None,
    templateUrl: "sidenav.component.pug",
    styleUrls: ["sidenav.component.scss"]
})

export class SideNavComponent implements OnInit {
    private allWikipages: IWikiPage[] = [];
    private allWikiPagesNav: IWikiNav[] = [];
 
    constructor(private wikiPageService: WikiPageService, private router: Router) {

    }

    ngOnInit(): void {
        this.wikiPageService.buildWikiNav();
        //this.buildWikiNav();
    }

    buildWikiNav() {
        this.wikiPageService.getAllWikiPages()
            .subscribe((wikiPages: IWikiPage[]) => {
                    if (wikiPages.length > 0) {
                        this.allWikipages = wikiPages;

                        this.allWikipages.forEach(wikiPage => {
                            this.loadNavObject(wikiPage, this.allWikiPagesNav, 0);
                        });
                    }
                },
                (err: any) => {
                    console.error(err);
                }     
            );
    }

    loadNavObject(wikiPage: IWikiPage, wikiPagesNav: IWikiNav[], level: number) {
        let exists = false;
        for (let i =0; i < wikiPagesNav.length; i++) {
            if (wikiPage.path.split('/')[level] == wikiPagesNav[i].path.split('/')[level]) {
                exists = true;

                if (level + 1 == wikiPage.path.split('/').length) {
                    wikiPagesNav[i].id = wikiPage._id;
                    wikiPagesNav[i].name = wikiPage.name;
                }
                break;
            }
        }
        if (!exists) {
            let newPageNav: IWikiNav = <IWikiNav>{};
            newPageNav.children = [];
            newPageNav.showChildren = false;
            newPageNav.id = wikiPage.path.split('/').length == level + 1 ? wikiPage._id : "";
            newPageNav.name = wikiPage.path.split('/').length == level + 1 ? wikiPage.name : wikiPage.path.split('/')[level];
            newPageNav.path = wikiPage.path.split('/').map((pathPart: string, ind: number) => {if(ind <= level) {return pathPart;}}).join('/');

            wikiPagesNav.push(newPageNav);
        }

        if (wikiPage.path.split('/').length > level + 1) {
            wikiPagesNav.forEach(wikiPageNav => {
                if (wikiPageNav.path.split('/')[level] == wikiPage.path.split('/')[level]) {
                    this.loadNavObject(wikiPage, wikiPageNav.children, level + 1);
                }
            });
        }
    }
};