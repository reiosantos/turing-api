import * as express from 'express';

const apiPrefix = '/api';

const router = express.Router();

const routes = (app) => {
	app.use(router);
	return app;
};

export default routes;
