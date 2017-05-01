import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import {IWikiPage} from "../../../interfaces";
import {WikiPageService} from '../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: "wikipage.component.pug",
    styleUrls: ["wikipage.component.scss"]
})

export class WikiPageComponent implements OnInit {
    private currentPage: IWikiPage = <IWikiPage>{ content: "", created: Date.now().toString(), modified: Date.now().toString(), name: "", version: 0 };
    
    constructor(private wikiPageService: WikiPageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {

        this.route.params
            .switchMap((params: Params) => this.wikiPageService.getWikiPage(params['wikipath']))
                .subscribe(
                    (wikiPage: IWikiPage) => {
                        if (wikiPage) {
                            this.currentPage = wikiPage;
                        } else {
                            console.error("No Page or Empty Page Returned");
                        }
                    },
                    (err: any) => {
                        console.error(err);
                    }
                );
    }

    saveWikiPage() {
        var wikiPage: IWikiPage = <IWikiPage>{};

        if (this.currentPage._id) {
            wikiPage._id = this.currentPage._id;
        }
        wikiPage.content = this.currentPage.content;
        wikiPage.name = this.currentPage.name;
        wikiPage.created = this.currentPage.created;
        wikiPage.modified = Date.now().toString();
        wikiPage.version = this.currentPage.version + 1;
        wikiPage.path = this.currentPage.path;

        if (wikiPage._id) {
            this.wikiPageService.updateWikiPage(wikiPage)
                .subscribe(
                    (resWikiPage: IWikiPage) => {
                        console.log('updated existing wiki', resWikiPage);
                    },
                    (err: any) => {
                        console.error(err);
                    }
                )
        } else {
            this.wikiPageService.createWikiPage(wikiPage)
                .subscribe(
                    (resWikiPage: IWikiPage) => {
                        console.log("created new wiki", resWikiPage);
                    },
                    (err: any) => {
                        console.error(err);
                    }
                );
        }
    }
};