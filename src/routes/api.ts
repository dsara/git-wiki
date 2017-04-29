import * as express from "express";
import {WikiPage} from '../controllers';

var router = express.Router();

//var Page = require("../model/gitwikipage");

// api for pages
router.get('/pages', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  WikiPage.getWikiPage('New Title').then((wikiPage) => {
    res.send(wikiPage);
  });
});

router.post('/pages', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  WikiPage.newWikiPage(req.body).then((wikiPage) => {
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