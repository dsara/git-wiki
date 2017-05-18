import * as mongoose from 'mongoose';
import {IWikiUser} from "../interfaces";
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as passportLocalMongoose from 'passport-local-mongoose'

var appConfig = JSON.parse(fs.readFileSync("express.settings.json", "utf8"));


var _wikiUserSchema: mongoose.Schema = new mongoose.Schema({
    username: String,
    password: String
});

_wikiUserSchema.plugin(passportLocalMongoose);

// _wikiUserSchema.methods.setPassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//     // this.salt = crypto.randomBytes(16).toString('hex');
//     // this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
// }

// _wikiUserSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.hash);

//     // var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
//     // return this.hash == hash;
// }

// _wikiUserSchema.methods.generateJwt = () => {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);

//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: (expiry.getTime() / 1000)
//     }, appConfig.secret);
// }

type WikiUserType = IWikiUser & mongoose.Document;

export var wikiUserModel = mongoose.model <WikiUserType> ('WikiUser', _wikiUserSchema);