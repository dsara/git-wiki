import {Injectable, Input, Output, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";

import {IWikiPage} from '../../../interfaces';
import {HttpHeadersService} from "./http-headers.service";

import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class WikiPageService {
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
                            version: 0
                        };
                    }
                } else {
                    return <IWikiPage> {
                        content: "",
                        created: Date.now().toString(),
                        modified: Date.now().toString(),
                        name: '',
                        path: path,
                        version: 0
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
                    res.json();
                } catch(err) {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    createWikiPage(wikiPage: IWikiPage): Observable<IWikiPage> {
        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/pages", JSON.stringify(wikiPage), reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateWikiPage(wikiPage: IWikiPage): Observable<IWikiPage> {
        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/pages/update", JSON.stringify(wikiPage), reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error || "Server error");
    }
}