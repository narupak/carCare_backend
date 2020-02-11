import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import auth from './middlewares/auth';

function setupRoutes(app) {
    const APP_DIR = `${__dirname}/`;

    const features = fs
        .readdirSync(APP_DIR)
        .filter(file => fs.statSync(`${APP_DIR}/${file}`).isDirectory());
    features.forEach(feature => {
        if (feature == "app") {
            const router = express.Router();
            const routes = require(`${APP_DIR}/${feature}/routes.js`);

            routes.setup(router);
            app.use(`/${feature}`, router);
        }

    });
}
export function setup() {
    const app = express();
    const PORT = 3000;

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
    });
    app.use(auth);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.use(bodyParser.json({
    //     extended: true,
    //     limit: '50mb'
    // }))
    setupRoutes(app);
    // "192.168.163.2"
    app.listen(PORT, () => {
        console.log('App listening on http://localhost:' + PORT);
    });
}