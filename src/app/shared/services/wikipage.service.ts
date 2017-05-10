import {Injectable, Input, Output, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";

import {IWikiPage, IWikiNav} from '../../../interfaces';
import {HttpHeadersService} from "./http-headers.service";

import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class WikiPageService {
    public allWikiPages: IWikiPage[] = [];
    public wikiPageNav: IWikiNav[] = [];

    constructor(private http: Http, private httpHeaders: HttpHeadersService) { }

    getWikiPage(path: string): Observable<IWikiPage> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/pages/" + encodeURIComponent(path), reqOptions)
            .map((res: Response) => {
                if(res){
                    try {
                        return res.json();
                    } catch(err) {
                        return <IWikiPage> {
                            content: "",
                            created: Date.now().toString(),
                            modified: Date.now().toString(),
                            name: '',
                            path: path,
                            version: 0,
                            tags: []
                        };
                    }
                } else {
                    return <IWikiPage> {
                        content: "",
                        created: Date.now().toString(),
                        modified: Date.now().toString(),
                        name: '',
                        path: path,
                        version: 0,
                        tags: []
                    };
                }
            })
            .catch(this.handleError);
    }

    getAllWikiPages(deep?: number): Observable<IWikiPage[]> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/pages", reqOptions)
            .map((res: Response) => {
                try {
                    return res.json();
                } catch(err) {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    getAllWikiPagesNav(deep?: number): Observable<IWikiPage[]> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/nav", reqOptions)
            .map((res: Response) => {
                try {
                    return res.json();
                } catch(err) {
                    return [];
                }
            })
            .catch(this.handleError);
    }  

    createWikiPage(currentPage: IWikiPage): Observable<IWikiPage> {
        var wikiPage: IWikiPage = this.createWikiPageSaveObject(currentPage);

        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/pages", JSON.stringify(wikiPage), reqOptions)
            .map((res: Response) => {
                this.buildWikiNav();
                return res.json();
            })
            .catch(this.handleError);
    }

    updateWikiPage(currentPage: IWikiPage): Observable<IWikiPage> {
        var wikiPage: IWikiPage = this.createWikiPageSaveObject(currentPage);

        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/pages/update", JSON.stringify(wikiPage), reqOptions)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    createWikiPageSaveObject(page: IWikiPage): IWikiPage {
        var wikiPage: IWikiPage = <IWikiPage>{};

        if (page._id) {
            wikiPage._id = page._id;
        }
        wikiPage.content = page.content;
        wikiPage.name = page.name;
        wikiPage.created = page.created;
        wikiPage.modified = Date.now().toString();
        wikiPage.version = page.version + 1;
        wikiPage.path = page.path;
        wikiPage.tags = page.tags;

        return wikiPage;
    }

    buildWikiNav() {
        this.getAllWikiPagesNav()
            .subscribe((wikiPages: IWikiPage[]) => {
                    if (wikiPages.length > 0) {
                        this.allWikiPages = wikiPages;

                        this.allWikiPages.forEach(wikiPage => {
                            this.loadNavObject(wikiPage, this.wikiPageNav, 0);
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

    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error || "Server error");
    }
}