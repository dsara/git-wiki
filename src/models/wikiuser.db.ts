import * as mongoose from 'mongoose';
import {IWikiUser} from "../interfaces";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

var appConfig = JSON.parse(fs.readFileSync("src/config/express.settings.json", "utf8"));


var _wikiUserSchema: mongoose.Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hash: String,
    salt: String
});

_wikiUserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

_wikiUserSchema.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

_wikiUserSchema.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: (expiry.getTime() / 1000)
    }, appConfig.secret);
}

type WikiUserType = IWikiUser & mongoose.Document;

export var wikiUserModel = mongoose.model <WikiUserType> ('WikiUser', _wikiUserSchema);