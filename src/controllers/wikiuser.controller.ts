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

    static setupStrategies(): void {
        passport.use('local-login', new LocalStrategy({
                usernameField: 'email'
            },
            (username, password, done) => {
                wikiUserModel.findOne({email: username}, (err, user) => {
                    if (err) { return done(err) }

                    if (!user) {
                        return done(null, false, {
                            message: 'User not found'
                        });
                    }

                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Password is wrong'
                        });
                    }

                    return done(null, user);
                });
            }
        ));

        passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                if (!req.user) {
                    wikiUserModel.findOne({email: email}, function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            return done(null, false, {
                                message: 'User already exists'
                            })
                        } else {
                            var newUser = new wikiUserModel();
                            newUser.email = email;
                            newUser.name = name;
                            newUser.setPassword(password);

                            newUser.save((err) => {
                                if (err) { return done(err) }

                                return done(null, newUser);                                
                            })
                        }
                    });
                } else {
                    var user = req.user;

                    user.email = email;
                    user.setPassword(password);

                    user.save((err) => {
                        if (err) {
                            throw err;
                        }
                        return done(null, user);
                    });
                }
            }
        ));
        
    }

    static login(req: express.Request, res: express.Response) {
        passport.authenticate('local-login', (err, user, info) => {
            var token;

            if (err) {
                res.status(404).json(err);
                return;
            }

            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    'token': token
                });
            } else {
                res.status(401).json(info);
            }
        });
    }

    static register(req: express.Request, res: express.Response) {
        passport.authenticate('local-signup', (err, user, info) => {
            var token;

            if (err) {
                res.status(404).json(err);
                return;
            }

            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    'token': token
                });
            } else {
                res.status(401).json(info);
            }
        });
    }
}