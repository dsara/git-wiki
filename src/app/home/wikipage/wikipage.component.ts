import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {IWikiPage} from "../../../interfaces";
import {WikiPageService} from '../../shared/services';

import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: "wikipage.component.pug",
    styleUrls: ["wikipage.component.scss"]
})

export class WikiPageComponent implements OnInit {
    @Output() wikiPageUpdated = new EventEmitter();
    private currentPage: IWikiPage = <IWikiPage>{ content: "", created: Date.now().toString(), modified: Date.now().toString(), name: "", version: 0 };
    markdownForm: FormGroup;

    constructor(private wikiPageService: WikiPageService, private route: ActivatedRoute, private router: Router) {
        this.markdownForm = new FormGroup({
            markdownTitle: new FormControl({ value: '', disabled: false }, Validators.required),
            markdownContent: new FormControl({ value: '', disabled: false }, Validators.required)
        });
    }

    ngOnInit(): void {

        this.route.url
            .subscribe((url: UrlSegment[]) => {
                // console.log(url);


                this.wikiPageService.getWikiPage(url.map((urlSegment, ind: number) => { return urlSegment.path }).join('/'))
                    .subscribe(
                        (wikiPage: IWikiPage) => {
                            this.markdownForm.markAsUntouched();
                            if (wikiPage) {
                                this.currentPage = wikiPage;
                            } else {
                                console.error('No page or empty page returned');
                            }
                        },
                        (err: any) => {
                            console.error(err);
                        }
                    );
            });

        // this.route.params
        //     .switchMap((params: Params) => this.wikiPageService.getWikiPage(params['wikipath']))
        //         .subscribe(
        //             (wikiPage: IWikiPage) => {
        //                 if (wikiPage) {
        //                     this.currentPage = wikiPage;
        //                 } else {
        //                     console.error("No Page or Empty Page Returned");
        //                 }
        //             },
        //             (err: any) => {
        //                 console.error(err);
        //             }
        //         );
    }

    saveWikiPage() {
        if (this.currentPage._id) {
            this.wikiPageService.updateWikiPage(this.currentPage)
                .subscribe(
                    (resWikiPage: IWikiPage) => {
                        console.log('updated existing wiki', resWikiPage);
                    },
                    (err: any) => {
                        console.error(err);
                    }
                )
        } else {
            this.wikiPageService.createWikiPage(this.currentPage)
                .subscribe(
                    (resWikiPage: IWikiPage) => {
                        console.log("created new wiki", resWikiPage);
                        this.currentPage = resWikiPage;
                    },
                    (err: any) => {
                        console.error(err);
                    }
                );
        }
    }
};