const { ObjectId } = require('mongodb');

const adsModel = require('./ads.model');
const adsValidator = require('../validators/adsValidator');
const adSchema = require('../schemas/create.ad.schema');
const idSchema = require('../schemas/id.schema');
const fieldsSchema = require('../schemas/fields.schema');

const PAGE_DEFAULT = 0;
const LIMIT_DEFAULT = 10;

class AdsController {
    async createAd(req, res, next) {
        const notValid = await adsValidator(req.body, adSchema);

        if (notValid) {
            return res.status(400).send({ error: notValid });
        }

        const date = new Date();
        const strDate = date.getFullYear().toString() + '-' +
            date.getMonth().toString() + '-' +
            date.getUTCDate().toString();

        try {
            const newAd = await adsModel.create({ ...req.body, date: strDate });
            return res.status(201).send({ "created-ad-id": newAd._id });

        }
        catch (err) {
            next(err);
        }
        next();
    }

    async getAdById(req, res, next) {
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
            const ad = await adsModel.findById(ObjectId(req.params.id));

            if (!ad) {
                return res.status(404).send({ message: 'ad not found.' });
            }

            const { title, description, price, links } = ad;

            const adToRequest = {
                title,
                price,
                link: links && links.length > 0 ? links[0] : 'Link to photo does not exist'
            }

            //add field to object depending on the req.param.fields
            const objToSend = fieldsArray.reduce((prev, cur) => {
                return { ...prev, [cur]: ad[cur] }
            }, adToRequest);

            return res.status(200).send(objToSend);
        }
        catch (err) {
            next(err);
        }
        next();
    }

    async getAdByQuery(req, res, next) {
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
            const ads = await adsModel
                .find({ title: pattern })
                .sort({ 'price': intSortByPrice })
                .sort({ 'date': intSortByDate })
                .limit(limit)
                .skip(page * limit);
                console.log('page: ', page)

            return ads.length > 0
                ? res.status(200).send(ads)
                : res.status(404).send({ message: `${key} Not found.` });
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = new AdsController();
