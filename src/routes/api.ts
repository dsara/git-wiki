import * as express from "express";
import {WikiPage} from '../controllers';

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

export = router;