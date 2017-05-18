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

    // static login(req: express.Request, res: express.Response) {
    //     passport.authenticate('local', (err, user, info) => {
    //         var token;

    //         if (err) {
    //             res.status(404).json(err);
    //             return;
    //         }

    //         if (user) {
    //             token = user.generateJwt();
    //             res.status(200);
    //             res.json({
    //                 'token': token
    //             });
    //         } else {
    //             res.status(401).json(info);
    //         }
    //     })(req, res, function(){});
    // }

    static isLoggedIn(req: express.Request, res: express.Response, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401);
    }

    // static register(req: express.Request, res: express.Response) {
    //     passport.authenticate('local-signup', (err, user, info) => {
    //         var token;

    //         if (err) {
    //             res.status(404).json(err);
    //             return;
    //         }

    //         if (user) {
    //             token = user.generateJwt();
    //             res.status(200);
    //             res.json({
    //                 'token': token
    //             });
    //         } else {
    //             res.status(401).json(info);
    //         }
    //     });
    // }

    // static register(req: express.Request, res: express.Response) {
    //     var user = new wikiUserModel();

    //     user.name = req.body.name;
    //     user.email = req.body.email;

    //     user.hash = user.setPassword(req.body.password);
    //     // user.setPassword(req.body.password);

    //     user.save((err) => {
    //         var token;
    //         token = user.generateJwt();
    //         res.status(200);
    //         res.json({
    //             'token': token
    //         });
    //     });
    // }

    static register(req: express.Request, res: express.Response) {
        wikiUserModel.register(new wikiUserModel({ username: req.body.username }), req.body.password, function (err, account) {
            if (err) {
                return res.render('register', {info: 'Sorry, that username already exists. Try again.'});
            }

            passport.authenticate('local')(req, res, function() {
                res.status(200).json({ done: 'authenticated' });
                //res.redirect('/');
            });
        });
    }

    static login(req: express.Request, res: express.Response) {
        res.status(200);
    }
}