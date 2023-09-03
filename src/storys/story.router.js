const Router = require('express').Router;
const storyRouter = Router();
const storyController = require('./story.controller');

storyRouter.post("/create-story", storyController.createStory);
storyRouter.get("/stories/:id/", storyController.getStoryById);
storyRouter.get("/stories", storyController.getStoryByQuery);

module.exports = storyRouter;