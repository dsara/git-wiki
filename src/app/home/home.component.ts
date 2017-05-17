import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {IWikiPage} from "../../interfaces";
import {WikiPageService} from '../shared/services';

@Component({
    selector: "git-wiki",
    templateUrl: "home.component.pug",
    styleUrls: ["home.component.scss"]
})

export class HomeComponent implements OnInit {
    sideNavOpen: boolean = true;

    constructor(private wikiPageService: WikiPageService) {

    }

    ngOnInit(): void {
        
    }

};