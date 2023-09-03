const { ObjectId } = require('mongodb');

const adsValidator = require('../validators/adsValidator');
const idSchema = require('../schemas/id.schema');
const fieldsSchema = require('../schemas/fields.schema');
const storySchema = require('../schemas/story.schema');
const storyModel = require('../storys/story.model');

const PAGE_DEFAULT = 0;
const LIMIT_DEFAULT = 10;

class StoryController {
    async createStory(req, res, next) {
        const notValid = await adsValidator(req.body, storySchema);

        if (notValid) {
            return res.status(400).send({ error: notValid });
        }

        const date = new Date();
        const strDate = date.getFullYear().toString() + '-' +
            date.getMonth().toString() + '-' +
            date.getUTCDate().toString();

        try {
            const newStory = await storyModel.create({ ...req.body, date: strDate });
            return res.status(201).send({ "created-story-id": newStory._id });

        }
        catch (err) {
            next(err);
        }
        next();
    }

    async getStoryById(req, res, next) {
        const notValidId = await adsValidator({ _id: req.params.id }, idSchema);

        if (notValidId) {
            return res.status(404).send({ message: notValidId });
        }

        const fields = req.query.fields ? req.query.fields : '';
        let fieldsArray = [];

        if (fields.length > 0) {
            fieldsArray = [...fields.split(',')];
            const notValidFields = await adsValidator(fieldsArray, fieldsSchema);

            if (notValidFields) {
                return res.status(404).send({ message: notValidFields });
            }
        }

        try {
            const story = await storyModel.findById(ObjectId(req.params.id));

            if (!story) {
                return res.status(404).send({ message: 'story not found. :)' });
            }

            const { title, description, storyType, images } = story;

            const adToRequest = {
                title,
                description,
                storyType,
                images,
            }

            //add field to object depending on the req.param.fields
            // const objToSend = fieldsArray.reduce((prev, cur) => {
            //     return { ...prev, [cur]: ad[cur] }
            // }, adToRequest);

            return res.status(200).send(adToRequest);
        }
        catch (err) {
            next(err);
        }
        next();
    }

    async getStoryByQuery(req, res, next) {
        try {
            const page = req.query.page ? Number(req.query.page) : PAGE_DEFAULT;
            const limit = req.query.limit ? Number(req.query.limit) : LIMIT_DEFAULT;

            const key = req.query.title;
            const sortByPrice = req.query.sort_by_price ? req.query.sort_by_price : '1';
            const intSortByPrice = Number(sortByPrice);

            if ((intSortByPrice !== 1) && (intSortByPrice !== -1)) {
                return res.status(400).send({ error: "sort_by_price does contain not valid value" })
            }

            const sortByDate = req.query.sort_by_date ? req.query.sort_by_date : '1';
            const intSortByDate = Number(sortByDate);

            if ((intSortByDate !== 1) && (intSortByDate !== -1)) {
                return res.status(400).send({ error: "sort_by_date does contain not valid value" })
            }

            const pattern = new RegExp(key, "i");
            const storys = await storyModel
                .find({ title: pattern })
                .sort({ 'price': intSortByPrice })
                .sort({ 'date': intSortByDate })
                .limit(limit)
                .skip(page * limit);
                console.log('page: ', page)

            return storys.length > 0
                ? res.status(200).send(storys)
                : res.status(404).send({ message: `${key} Not found.` });
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new StoryController();
