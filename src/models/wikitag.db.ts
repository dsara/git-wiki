import * as mongoose from 'mongoose';
import {IWikiTag} from "../interfaces";

var _wikiTagSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date, required: true }
});

type WikiTagType = IWikiTag & mongoose.Document;

export var wikiTagModel = mongoose.model <WikiTagType> ('WikiTag', _wikiTagSchema);