import * as express from "express";
import {WikiPage, WikiTag, WikiUser} from '../controllers';

var router = express.Router();

//var Page = require("../model/gitwikipage");

// api for pages
router.get('/pages/:path', function(req, res, next) {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiPage(decodeURIComponent(req.params.path)).then((wikiPage) => {
        res.send(wikiPage);
    });
});

router.get('/pages', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiPages().then((wikiPages) => {
        res.send(wikiPages);
    });
});

router.get('/nav', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.getWikiNavPages().then((wikiNavPages) => {
        res.send(wikiNavPages);
    });
});

router.post('/pages', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.newWikiPage(req.body).then((wikiPage) => {
        res.send(wikiPage);
    });
});

router.post('/pages/update', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiPage.saveWikiPage(req.body).then((wikiPage) => {
        res.send(wikiPage);
    });
});

// router.post('/pages/create', function(req, res, next) {
//   Page.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// api for tags
router.get('/tags/:name', function(req, res, next) {
    res.set('Content-Type', 'application/json');
    WikiTag.getWikiTag(decodeURIComponent(req.params.name)).then((wikiTag) => {
        res.send(wikiTag);
    });
});

router.get('/tags/search/:search', function(req, res, next) {
    res.set('Content-Type', 'application/json');
    WikiTag.getWikiTags(decodeURIComponent(req.params.search)).then((wikiTags) => {
        res.send(wikiTags);
    });
});

router.get('/tags', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiTag.getAllWikiTags().then((wikiTags) => {
        res.send(wikiTags);
    });
});

router.post('/tags', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiTag.newWikiTag(req.body).then((wikiTag) => {
        res.send(wikiTag);
    });
});

router.post('/tags/update', (req, res, next) => {
    res.set('Content-Type', 'application/json');
    WikiTag.saveWikiTag(req.body).then((wikiTag) => {
        res.send(wikiTag);
    });
});

// authentication

router.post('/login', WikiUser.login);

router.post('/register', WikiUser.register);

export = router;