import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {IWikiPage} from "../../../interfaces";
import {WikiPageService} from '../../shared/services';

@Component({
    templateUrl: "overview.component.pug",
    styleUrls: ["overview.component.scss"]
})

export class OverviewComponent implements OnInit {
   
    constructor(private wikiPageService: WikiPageService) {

    }

    ngOnInit(): void {

    }
};