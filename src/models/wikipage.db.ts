import * as mongoose from 'mongoose';
import {IWikiPage} from "../interfaces";

var _schema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: String, required: true },
    version: { type: Number, required: true }
});

type WikiPageType = IWikiPage & mongoose.Document;

export var wikiPageModel = mongoose.model <WikiPageType> ('WikiPage', _schema);