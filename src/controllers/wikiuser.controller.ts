import {IWikiUser} from '../interfaces';
import {wikiUserModel} from '../models';
import * as mongoose from 'mongoose';
import * as express from 'express';

import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

import {Passport} from 'passport';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
var LocalStrategy = passportLocal.Strategy;


export class WikiUser {

    static isLoggedIn(req: express.Request, res: express.Response, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).json({ error: 'You are not logged in'});
    }

    static logOut(req: express.Request, res: express.Response, next) {
        req.logOut();

        res.status(200).json({ message: 'Logged Out' });
    }

    static register(req: express.Request, res: express.Response) {
        wikiUserModel.register(new wikiUserModel({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
                res.status(409).json({ message: 'Sorry, that username already exists. Try again.'});
                return;
            }

            passport.authenticate('local')(req, res, function() {
                res.status(200).json({ login: { status: 'authenticated', user: req.body.username } });
                //res.redirect('/');
            });
        });
    }

    static login(req: express.Request, res: express.Response) {
        res.status(200).json({ login: { status: 'authenticated', user: req.body.username } });
    }
}