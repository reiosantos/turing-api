import jwt from 'express-jwt';
import jwtoken from 'jsonwebtoken';
import {errors, CUSTOMER_MODAL} from '../constants';
import DatabaseWrapper from '../models';


const getTokenFromHeaders = (req) => {
	const { headers } = req;
	const authorization = headers['USER-KEY'];
	
	if (authorization && authorization.split(' ')[0].toLowerCase() === 'Bearer') {
		return authorization.split(' ')[1];
	}
	return null;
};

const addUserData = async (req, res, next) => {
	const payload = jwtoken.decode(getTokenFromHeaders(req));

	const user = await DatabaseWrapper.findOne(CUSTOMER_MODAL, payload.identity);
	if (!user) {
		return res.status(401).json(errors.unauthorized);
	}

	req.userData = {
		...user,
		password: undefined
	};
	return next();
};

const auth = {
	required: jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload',
		getToken: getTokenFromHeaders
	}),
	optional: jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
		credentialsRequired: false
	}),
	addUserData
};

export default auth;
