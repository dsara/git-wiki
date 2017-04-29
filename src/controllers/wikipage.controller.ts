import {IWikiPage} from '../interfaces';
import {wikiPageModel} from '../models';
import * as mongoose from 'mongoose';

export class WikiPage {
    static getWikiPage(title: string): Promise<IWikiPage> {
        return wikiPageModel.findOne({ name: /^New Title$/ }, (err, wikiPage) => {
            if (err) {
                console.error(err);
            }
            return wikiPage;
        });
    }

    static newWikiPage(wikiPage: IWikiPage): Promise<IWikiPage> {
       return wikiPageModel.create(wikiPage, (err: any, wikiPage) => {
            if (err) {
                console.error(err);
            }
            return wikiPage;
        });
    }
}