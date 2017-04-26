import * as express from "express";
import IndexController from "../controllers/index.controller";

let router = express.Router();

router.get('/', IndexController.read);

export = router;