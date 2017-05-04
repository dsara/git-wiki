import * as mongoose from 'mongoose';
import {IWikiPage} from "../interfaces";

var _wikiPageSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date, required: true },
    version: { type: Number, required: true },
    path: { type: String, required: true },
    tags: { type: [String], required: false}
});

type WikiPageType = IWikiPage & mongoose.Document;

export var wikiPageModel = mongoose.model <WikiPageType> ('WikiPage', _wikiPageSchema);