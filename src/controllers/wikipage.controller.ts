import {IWikiPage} from '../interfaces';
import {wikiPageModel} from '../models';
import * as mongoose from 'mongoose';

export class WikiPage {
    static getWikiPage(path: string): Promise<IWikiPage> {
        return wikiPageModel.findOne({ path: path }, (err, wikiPage) => {
            if (err) {
                console.error(err);
            }
            return wikiPage;
        });
    }

    static getWikiPages(): Promise<IWikiPage[]> {
        return wikiPageModel.find({}, (err, wikiPages: IWikiPage[]) => {
            if (err) {
                console.error(err);
            }
            return wikiPages;
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

    static saveWikiPage(wikiPage: IWikiPage): Promise<IWikiPage> {
        return wikiPageModel.findByIdAndUpdate(wikiPage._id, wikiPage, (err: any, wikiPage) => {
            if (err) {
                console.error(err);
            }
            return wikiPage;
        });
    }
}