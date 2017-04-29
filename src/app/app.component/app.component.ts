import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {IWikiPage} from "../../interfaces";
import {WikiPageService} from '../shared/services';

@Component({
    selector: "git-wiki",
    templateUrl: "app.component.pug",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit {
    private markdownSource: string = "";
    
    constructor(private wikiPageService: WikiPageService) {

    }

    ngOnInit(): void {
        this.wikiPageService.getWikiPage('New Title')
            .subscribe(
                (wikiPage: IWikiPage) => {
                    if (wikiPage) {
                        this.markdownSource = wikiPage.content;
                    }
                },
                (err: any) => {
                    console.error(err);
                }
            )
    }

    saveWikiPage() {
        var wikiPage: IWikiPage = <IWikiPage>{};

        wikiPage.content = this.markdownSource;
        wikiPage.name = "New Title";
        wikiPage.created = Date.now().toString();
        wikiPage.modified = Date.now().toString();
        wikiPage.version = 1;

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
};