import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";

import {IWikiPage, IWikiNav} from "../../../../interfaces";
import {WikiPageService} from '../../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'gitwiki-sidenav',
    templateUrl: "wikipage.component.pug",
    styleUrls: ["wikipage.component.scss"]
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

                        // wikiPages.forEach(wikiPage => {
                        //     this.buildChildNavItems(wikiPage, 0);
                        // });
                    }
                },
                (err: any) => {
                    console.error(err);
                }     
            );
    //     // this.route.url
    //     //     .subscribe((url: UrlSegment[]) => {
    //     //         this.wikiPageService.getWikiPage(url.map((urlSegment, ind: number) => { if (ind !== 0) {return urlSegment.path;} }).join('/'))
    //     //             .subscribe(
    //     //                 (wikiPage: IWikiPage) => {
    //     //                     if (wikiPage) {
    //     //                         this.currentPage = wikiPage;
    //     //                     } else {
    //     //                         console.error('No page or empty page returned');
    //     //                     }
    //     //                 },
    //     //                 (err: any) => {
    //     //                     console.error(err);
    //     //                 }
    //     //             );
    //     //     });
    // }

    // buildChildNavItems(wikiPage: IWikiPage, level: number) {
    //     let paths = wikiPage.path.split('/');

    //     for (let i = 0; i < paths.length; i++) {
    //         this.findWikiPageOnLevel(this.allWikiPagesNav, paths[i], i);
    //     }

    //     if (!this.findWikiPageOnLevel(this.allWikiPagesNav, wikiPage._id)) {

    //     }
    // }

    // findWikiPageOnLevel(wikiNavs: IWikiNav[], pageName: string, level: number): boolean {
    //     wikiNavs.forEach((wikiNav: IWikiNav) => {
    //         if (wikiNav.name == pageName) {
    //             return true;
    //         }
    //         if (wikiNav.children.length > 0) {
    //             return this.findWikiPageOnLevel(wikiNav.children, pageName);
    //         }
    //     });

    //     return false;
    // }
};