import {Injectable} from "@angular/core";
import {Headers} from "@angular/http";

@Injectable()
export class HttpHeadersService {
    public GETDefaultHeaders(): Headers {
        return new Headers({
            "Accept": "application/json; odata=verbose"
        });
    }

    public POSTDefaultHeaders(requestDigest?: string): Headers {
        return new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
        });
    }

    // public POSTMergeHeaders(requestDigest?: string, matchVersion?: string): Headers {
    //     return new Headers({
    //         "Accept": "application/json; odata=verbose",
    //         "Content-Type": "application/json; odata=verbose",
    //         "X-RequestDigest": requestDigest ? requestDigest : (<HTMLInputElement>document.getElementById("__REQUESTDIGEST")).value,
    //         "X-HTTP-Method": "MERGE",
    //         "If-Match": matchVersion ? matchVersion : "*"
    //     });
    // }

    // public POSTDeleteHeaders(requestDigest?: string, matchVersion?: string): Headers {
    //     return new Headers({
    //         "Accept": "application/json; odata=verbose",
    //         "Content-Type": "application/json; odata=verbose",
    //         "X-RequestDigest": requestDigest ? requestDigest : (<HTMLInputElement>document.getElementById("__REQUESTDIGEST")).value,
    //         "X-HTTP-Method": "DELETE",
    //         "If-Match": matchVersion ? matchVersion : "*"
    //     });
    // }
}

          