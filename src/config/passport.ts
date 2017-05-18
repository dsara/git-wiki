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

// passport.serializeUser(function(user: IWikiUser, done) {
//     done(null, user._id)
// });

// passport.deserializeUser(function(id, done) {
//     wikiUserModel.findById(id, function(err, user) {
//         done(err, user);
//     });
// });


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    wikiUserModel.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));


// passport.use('local-login', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     (username, password, done) => {
//         wikiUserModel.findOne({email: username}, (err, user) => {
//             if (err) { return done(err) }

//             if (!user) {
//                 return done(null, false, {
//                     message: 'User not found'
//                 });
//             }

//             if (!user.validPassword(password)) {
//                 return done(null, false, {
//                     message: 'Password is wrong'
//                 });
//             }

//             return done(null, user);
//         });
//     }
// ));

// passport.use('local-signup', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     (req, email, password, done) => {
//         if (!req.user) {
//             wikiUserModel.findOne({email: email}, function (err, user) {
//                 if (err) {
//                     return done(err);
//                 }

//                 if (user) {
//                     return done(null, false, {
//                         message: 'User already exists'
//                     })
//                 } else {
//                     var newUser = new wikiUserModel();
//                     newUser.email = email;
//                     newUser.name = name;
//                     newUser.setPassword(password);

//                     newUser.save((err) => {
//                         if (err) { return done(err) }

//                         return done(null, newUser);                                
//                     })
//                 }
//             });
//         } else {
//             var user = req.user;

//             user.email = email;
//             user.setPassword(password);

//             user.save((err) => {
//                 if (err) {
//                     throw err;
//                 }
//                 return done(null, user);
//             });
//         }
//     }
// ));