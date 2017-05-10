import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {IWikiPage, IWikiTag} from "../../../interfaces";
import {WikiPageService, WikiTagService} from '../../shared/services';

import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs';

@Component({
    templateUrl: "wikipage.component.pug",
    styleUrls: ["wikipage.component.scss"]
})

export class WikiPageComponent implements OnInit {
    @Output() wikiPageUpdated = new EventEmitter();
    private currentPage: IWikiPage = <IWikiPage>{ content: "", created: Date.now().toString(), modified: Date.now().toString(), name: "", version: 0 };
    markdownForm: FormGroup;
    tagOptions: IWikiTag[];
    filteredTagOptions: Observable<IWikiTag[]>;

    constructor(private wikiPageService: WikiPageService, private wikiTagService: WikiTagService,  private route: ActivatedRoute, private router: Router) {
        this.markdownForm = new FormGroup({
            markdownTitle: new FormControl({ value: '', disabled: false }, Validators.required),
            markdownContent: new FormControl({ value: '', disabled: false }, Validators.required),
            markdownTags: new FormControl({ value: '', disabled: false })
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

            this.filteredTagOptions = this.markdownForm.controls["markdownTags"].valueChanges
                .startWith(null)
                .map(tag => tag && typeof tag === 'object' ? tag.name : tag)
                .flatMap(name => {
                    return this.tagFilter(name).map(
                        (wikiTags: IWikiTag[]) => {
                            if(wikiTags) {
                                return wikiTags;
                            } else {
                                return [];
                            }
                        },
                        (err: any) => {
                            console.error(err);
                        }
                    )
                });
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

    addTagToPage(tagValue: IWikiTag | string) {
        if (typeof tagValue === 'object') {
            if (this.currentPage.tags.indexOf(tagValue.name) == -1) {
                this.currentPage.tags.push(tagValue.name);
            }
            this.markdownForm.controls['markdownTags'].setValue("");
        } else {
            if (tagValue) {
                this.wikiTagService.getWikiTag(tagValue)
                    .subscribe(
                        (resWikiTag: IWikiTag) => {
                            if (resWikiTag) {
                                if (this.currentPage.tags.indexOf(resWikiTag.name) == -1) {
                                    this.currentPage.tags.push(resWikiTag.name);
                                }
                                this.markdownForm.controls['markdownTags'].setValue("");
                            } else {
                                let newTag: IWikiTag = <IWikiTag> {};
                                newTag.created = Date.now().toString();
                                newTag.modified = Date.now().toString();
                                newTag.name = tagValue;

                                this.wikiTagService.createWikiTag(newTag)
                                    .subscribe(
                                        (createdWikiTag: IWikiTag) => {
                                            console.log('created new tag', createdWikiTag);
                                            this.currentPage.tags.push(createdWikiTag.name);
                                            this.markdownForm.controls['markdownTags'].setValue("");
                                        },
                                        (err: any) => {
                                            console.error(err);
                                        }
                                    )
                            }
                        },
                        (err: any) => {
                            console.error(err);
                        }
                    )

            }
        }
    }

    modelChangeNotify(change: any) {
        console.log('model change ', change);

        if (typeof change == 'object') {
            this.addTagToPage(change);
        }
    }

    removeTagFromPage(tag: string) {
        let tagIndex = this.currentPage.tags.indexOf(tag);
        if (tagIndex != -1) {
            this.currentPage.tags.splice(tagIndex, 1);
        }
    }

    tagFilter(name: string): Observable<IWikiTag[]> {
        return this.wikiTagService.getWikiTags(name);
    }

    displayTag(wikiTag: IWikiTag): string {
        return wikiTag ? wikiTag.name : <any>wikiTag;
    }
};