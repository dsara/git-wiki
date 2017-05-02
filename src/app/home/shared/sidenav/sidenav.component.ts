import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";

import {IWikiPage, IWikiNav} from "../../../../interfaces";
import {WikiPageService} from '../../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'git-wiki-sidenav',
    templateUrl: "sidenav.component.pug",
    styleUrls: ["sidenav.component.scss"]
})

export class SideNavComponent implements OnInit {
    private allWikipages: IWikiPage[] = [];
    private allWikiPagesNav: IWikiNav[] = [];
 
    constructor(private wikiPageService: WikiPageService, private router: Router) {

    }

    ngOnInit(): void {

        this.wikiPageService.getAllWikiPages()
            .subscribe((wikiPages: IWikiPage[]) => {
                    if (wikiPages.length > 0) {
                        this.allWikipages = wikiPages;

                        this.allWikipages.forEach(wikiPage => {
                            let exists = false;
                            for (let i = 0; i < this.allWikiPagesNav.length; i++) {
                                if (wikiPage.path.split('/')[0] == this.allWikiPagesNav[i].path) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) {
                                let newPageNav: IWikiNav = <IWikiNav>{};
                                newPageNav.children = [];
                                newPageNav.id = wikiPage.path.split('/').length == 1 ? wikiPage._id : "";
                                newPageNav.name = wikiPage.path.split('/').length == 1 ? wikiPage.name : wikiPage.path.split('/')[0];
                                newPageNav.path = wikiPage.path.split('/')[0];

                                this.allWikiPagesNav.push(newPageNav);
                            }
                        });
                    }
                },
                (err: any) => {
                    console.error(err);
                }     
            );
    }
};