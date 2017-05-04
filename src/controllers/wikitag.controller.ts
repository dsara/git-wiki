import {IWikiTag} from '../interfaces';
import {wikiTagModel} from '../models';
import * as mongoose from 'mongoose';

export class WikiTag {
    static getWikiTag(name: string): Promise<IWikiTag> {
        return wikiTagModel.findOne({ name: new RegExp('^' + name + '$', 'i') }, (err, wikiTag) => {
            if (err) {
                console.error(err);
            }
            return wikiTag;
        });
    }

    static getWikiTags(name: string): Promise<IWikiTag[]> {
        return wikiTagModel.find({ name: new RegExp(name, 'i') }, (err, wikiTags) => {
            if (err) {
                console.error(err);
            }
            return wikiTags;
        });
    }

    static getAllWikiTags(): Promise<IWikiTag[]> {
        return wikiTagModel.find({}).exec((err, wikiTags: IWikiTag[]) => {
            if (err) {
                console.error(err);
            }
            return wikiTags;
        });
    }

    static newWikiTag(wikiTag: IWikiTag): Promise<IWikiTag> {
       return wikiTagModel.create(wikiTag, (err: any, resWikiTag) => {
            if (err) {
                console.error(err);
            }
            return resWikiTag;
        });
    }

    static saveWikiTag(wikiTag: IWikiTag): Promise<IWikiTag> {
        return wikiTagModel.findByIdAndUpdate(wikiTag._id, wikiTag, { new: true }).exec((err: any, resWikiTag) => {
            if (err) {
                console.error(err);
            }
            return resWikiTag;
        });
    }
}