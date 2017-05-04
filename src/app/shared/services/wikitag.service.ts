import {Injectable, Input, Output, EventEmitter} from "@angular/core";
import {Http, Response, RequestOptions} from "@angular/http";

import {IWikiPage, IWikiTag} from '../../../interfaces';
import {HttpHeadersService} from "./http-headers.service";

import {Observable} from "rxjs/Observable";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class WikiTagService {
    constructor(private http: Http, private httpHeaders: HttpHeadersService) { }

    getWikiTag(tagName: string): Observable<IWikiTag> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/tags/" + encodeURIComponent(tagName), reqOptions)
            .map((res: Response) => {
                if(res){
                    try {
                        return res.json();
                    } catch(err) {
                        return <IWikiTag> {
                            created: Date.now().toString(),
                            modified: Date.now().toString(),
                            name: ''
                        };
                    }
                } else {
                    return <IWikiTag> {
                        created: Date.now().toString(),
                        modified: Date.now().toString(),
                        name: ''
                    };
                }
            })
            .catch(this.handleError);
    }

    getWikiTags(tagName: string): Observable<IWikiTag[]> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/tags/search/" + encodeURIComponent(tagName), reqOptions)
            .map((res: Response) => {
                if(res){
                    try {
                        return res.json();
                    } catch(err) {
                        return [];
                    }
                } else {
                    return [];
                }
            })
            .catch(this.handleError);
    }


    getAllWikiTags(deep?: number): Observable<IWikiTag[]> {
        var reqOptions = new RequestOptions({
            headers: this.httpHeaders.GETDefaultHeaders()
        });

        return this.http.get("/api/tags", reqOptions)
            .map((res: Response) => {
                try {
                    return res.json();
                } catch(err) {
                    return [];
                }
            })
            .catch(this.handleError);
    }

    createWikiTag(currentTag: IWikiTag): Observable<IWikiTag> {
        var wikiTag: IWikiTag = this.createWikiTagSaveObject(currentTag);

        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/tags", JSON.stringify(wikiTag), reqOptions)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateWikiTag(currentTag: IWikiTag): Observable<IWikiTag> {
        var wikiTag: IWikiTag = this.createWikiTagSaveObject(currentTag);

        var reqOptions = new RequestOptions( {
            headers: this.httpHeaders.POSTDefaultHeaders()
        });

        return this.http.post("/api/tags/update", JSON.stringify(wikiTag), reqOptions)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    createWikiTagSaveObject(tag: IWikiTag): IWikiTag {
        var wikiTag: IWikiTag = <IWikiTag>{};

        if (wikiTag._id) {
            wikiTag._id = tag._id;
        }
        wikiTag.name = tag.name;
        wikiTag.created = tag.created;
        wikiTag.modified = tag.modified;

        return wikiTag;
    }

    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error || "Server error");
    }
}