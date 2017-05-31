import {IWikiTag} from '../interfaces';
import {wikiTagModel} from '../models';
import * as mongoose from 'mongoose';
import * as express from 'express';

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

    // static getAllWikiTags(): Promise<IWikiTag[]> {
    //     return wikiTagModel.find({}).exec((err, wikiTags: IWikiTag[]) => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         return wikiTags;
    //     });
    // }

    static getAllWikiTags(req: express.Request, res: express.Response, next: Function) {
        wikiTagModel.find({}).exec((err, wikiTags: IWikiTag[]) => {
            if (err) {
                console.error(err);
            }
            res.status(200).json(wikiTags);
        });
    }

    // static newWikiTag(wikiTag: IWikiTag): Promise<IWikiTag> {
    //    return wikiTagModel.create(wikiTag, (err: any, resWikiTag) => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         return resWikiTag;
    //     });
    // }

    static newWikiTag(req: express.Request, res: express.Response, next: Function) {
        wikiTagModel.create(req.body, (err: any, resWikiTag) => {
            if (err) {
                console.error(err);
            }
            res.status(200).json(resWikiTag);
        });
    }

    // static saveWikiTag(wikiTag: IWikiTag): Promise<IWikiTag> {
    //     return wikiTagModel.findByIdAndUpdate(wikiTag._id, wikiTag, { new: true }).exec((err: any, resWikiTag) => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         return resWikiTag;
    //     });
    // }

    static saveWikiTag(req: express.Request, res: express.Response, next: Function) {
        wikiTagModel.findByIdAndUpdate(req.body._id, req.body, { new: true }).exec((err: any, resWikiTag) => {
            if (err) {
                console.error(err);
            }
            res.status(200).json(resWikiTag);
        });
    }
}