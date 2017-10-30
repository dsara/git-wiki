import * as bodyParser from 'body-parser';
import config from './config';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as index from "../routes/index";
import * as api from '../routes/api';
import * as fs from "fs";
import * as passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
import * as session from 'express-session';
import {WikiUser} from '../controllers'
var appConfig = JSON.parse(fs.readFileSync("express.settings.json", "utf8"));

export default function(db) {
    var app = express();

    // database connection
    //mongoose.connect('mongodb://localhost:27017/gitwiki');
    mongoose.connect('mongodb://' + appConfig.dbserver + ':' + appConfig.dbport + '/' + appConfig.dbname,
                        {
                      user: appConfig.dbuser,
                      pass: appConfig.dbpassword,
                      useMongoClient: true});
    // mongoose.connect('mongodb://' + appConfig.dbuser + ':' + appConfig.dbpassword + '@' + appConfig.dbserver + ':' + appConfig.dbport + '/' + appConfig.dbname);
    (<any>mongoose).Promise = global.Promise;
    var mdb: mongoose.Connection = mongoose.connection;
    mdb.on('error', console.error.bind(console, 'connection error:'));

    app.set('views', path.join(__dirname, "../views"));
    app.set('view engine', 'pug');

    console.log("Environment: " + app.get('env'));

    if (app.get('env') === 'production') {
        app.locals.deployVersion = "0.0.1";
    }

    if (app.get('env') === 'development') {
        app.locals.deployVersion = (new Date).getTime();
    }

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../public')));

    //WikiUser.setupStrategies();
    
    app.use(session({
        secret: appConfig.secret,
        saveUninitialized: false,
        resave: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    // define routes
    // --------------------------------------

    app.use('/', index);
    app.use('/api', api);

    require('./passport');

    // app.use('/users', users);

    // app.use((req: express.Request, res: express.Response): void => {
    //     res.render('index');
    // });
    // app.all('*', (req: express.Request, res: express.Response, next: Function): void => {
    //     res.render('index');
    //     //res.sendFile(path.join(__dirname, '../views/index.html'));
    // });

    // catch 404 and forward to error handler
    app.use((req: express.Request, res: express.Response, next: Function): void => {
        var err = new Error('Not Found');
        (<any>err).status = 404;
        next(err);
    });

    // app.use((err, req, res, next) => {
    //     if (err.name === 'UnauthorizedError') {
    //         res.status(401);
    //         res.json({message: err.name + ": " + err.message});
    //     }
    // });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    return app;
}
