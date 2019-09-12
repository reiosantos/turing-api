import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import env from '../config/environment';
import {errors} from './constants';
import routes from './routes';

const app = express();

if (env.NODE_ENV === 'production') {
	// noinspection JSUnusedGlobalSymbols
	app.use(morgan('common', {
		skip: (req, res) => res.statusCode < 400,
		stream: `${__dirname}/../morgan.log`
	}));
} else {
	app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(expressValidator());

routes(app);

app.use((req, res) => res.status(404).json(errors.urlNotFound));

require('./helpers/passport');

export default app;
