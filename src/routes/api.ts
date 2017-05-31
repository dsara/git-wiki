import * as express from "express";
import {WikiPage, WikiTag, WikiUser} from '../controllers';
import * as fs from 'fs';
import * as passport from 'passport';
var appConfig = JSON.parse(fs.readFileSync("express.settings.json", "utf8"));

var router = express.Router();

// api for pages
router.get('/pages/:path', WikiUser.isLoggedIn, function(req: express.Request, res: express.Response, next) {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiPage(decodeURIComponent(req.params.path)).then((wikiPage) => {
        res.status(200).send(wikiPage);
    });
});

router.get('/pages', WikiUser.isLoggedIn, (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiPages().then((wikiPages) => {
        res.send(wikiPages);
    });
});

router.get('/nav', WikiUser.isLoggedIn, (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiNavPages().then((wikiNavPages) => {
        res.send(wikiNavPages);
    });
});

router.post('/pages', WikiUser.isLoggedIn, (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.newWikiPage(req.body).then((wikiPage) => {
        res.send(wikiPage);
    });
});

router.post('/pages/update', WikiUser.isLoggedIn, (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.saveWikiPage(req.body).then((wikiPage) => {
        res.send(wikiPage);
    });
});

// api for tags
router.get('/tags/:name', WikiUser.isLoggedIn, function(req, res, next) {
    res.set('Content-Type', 'application/json');
    WikiTag.getWikiTag(decodeURIComponent(req.params.name)).then((wikiTag) => {
        res.send(wikiTag);
    });
});

router.get('/tags/search/:search', WikiUser.isLoggedIn, function(req, res, next) {
    res.set('Content-Type', 'application/json');
    WikiTag.getWikiTags(decodeURIComponent(req.params.search)).then((wikiTags) => {
        res.send(wikiTags);
    });
});

router.get('/tags', WikiUser.isLoggedIn, WikiTag.getAllWikiTags);
router.post('/tags', WikiUser.isLoggedIn, WikiTag.newWikiTag);
router.post('/tags/update', WikiUser.isLoggedIn, WikiTag.saveWikiTag);

// authentication
router.post('/register', WikiUser.register);
router.post('/login', passport.authenticate('local'), WikiUser.login);
router.post('/logout', WikiUser.logOut);

export = router;