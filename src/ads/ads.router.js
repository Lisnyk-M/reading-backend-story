const Router = require('express').Router;
const adsRouter = Router();
const adsController = require('./ads.controller');

adsRouter.post("/create-ad", adsController.createAd);
adsRouter.get("/ads/:id/", adsController.getAdById);
adsRouter.get("/ads", adsController.getAdByQuery);

module.exports = adsRouter;