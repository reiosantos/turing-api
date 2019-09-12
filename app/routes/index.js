import express from 'express';
import {login, signup} from '../actions/auth';
import {errors} from '../constants';
import Helpers from '../helpers';
import CustomerMiddleware from '../middlewares/customerMiddleware';
import auth from './auth';

const appPrefix = '/api';
const router = express.Router();

const routes = (app) => {
	router
		.post(`${appPrefix}/customer`,
			auth.optional,
			CustomerMiddleware.validate('createUser'),
			Helpers.returnErrors,
			signup)
		.post(`${appPrefix}/customer/login`, auth.optional, login)

		.use((err, req, res, next) => {
			if (err.name === 'UnauthorizedError') {
				res.status(err.status).send(errors.unauthorized);
				return;
			}
			next();
		});

	app.use(router);
	return app;
};

export default routes;
