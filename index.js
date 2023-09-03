const express = require('express');
const app = express();
const { json } = require('express');
const morgan = require('morgan');
const ContactsService_v2 = require('./src/services/contact.service_v2');
const adsRouter = require('./src/ads/ads.router');


require('dotenv').config();
console.log('NODE_ENV: ', process.env.NODE_ENV)

const host = process.env.HOST;
const port = process.env.PORT || 443;
ContactsService_v2.dbConnect();

function logErrors(err, req, res, next) {
    console.error('logErrors: ', err);

    if (!err.status) { err.status = 400 };
    if (err.code === 11000) {
        err.message = 'Contact already in database';
        err.status = 409;
    };

    return res.status(err.status).send(err.message);
    // next(err);
}

app.use(json());
app.use(morgan('combined'));
app.use('/', adsRouter);
app.use( express.static('public'));

app.use('/upload', (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});
app.use(logErrors);

async function start() {
    app.listen(port, () =>
        console.log(`server is running on a port ${port}`)
    )
}

start();

module.exports.start = start;
module.exports.app = app;
