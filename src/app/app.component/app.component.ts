import { Component, OnInit, ViewContainerRef } from "@angular/core";

@Component({
    selector: "git-wiki",
    templateUrl: "app.component.pug",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit {
    private markdownSource: string = "";
    
    constructor() {

    }

    ngOnInit(): void {

    }
};