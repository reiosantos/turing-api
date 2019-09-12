// import bcrypt from 'bcrypt';
import express_jwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { CUSTOMER_MODAL, errors } from '../constants';
import DatabaseWrapper from '../models';

const expiryDate = {
	exp: 2,
	hrs: '48h'
};

export function validateHashPassword(plain, hashed) {
	return Promise.resolve(plain === hashed.split('')
		.reverse()
		.join(''));
	// TODO: Commented out due to the pass length of the string created by bcrypt (60+) we need
	//  a max of 50
	// return bcrypt.compare(plain, hashed);
}

export async function hashPassword(password) {
	return Promise.resolve(password.split('')
		.reverse()
		.join(''));
	// TODO: Commented out due to the pass length of the string created by bcrypt (60+) we need
	//  a max of 50
	// const SALT_WORK_FACTOR = 10;
	// const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
	// return bcrypt.hash(password, salt);
}

export function generateJWTToken(userObject) {
	const today = new Date();
	const expiry = new Date(today);
	
	expiry.setDate(today.getDate() + expiryDate.exp);
	return jwt.sign({
		identity: userObject.customer_id,
		exp: Number.parseInt(expiry.getTime() / 100, 10)
	}, process.env.JWT_KEY);
}

export function toAuthJSON(user) {
	const userObject = user.getSafeDataValues();
	const token = generateJWTToken(userObject);
	
	if (userObject.password) delete userObject.password;
	return {
		customer: userObject,
		access_token: 'Bearer ' + token,
		expires_in: expiryDate.hrs
	};
}

const getTokenFromHeaders = (req) => {
	const { headers } = req;
	const authorization = headers['USER-KEY'];
	
	if (authorization && authorization.split(' ')[0].toLowerCase() === 'Bearer') {
		return authorization.split(' ')[1];
	}
	return null;
};

const addUserData = async (req, res, next) => {
	const payload = jwt.decode(getTokenFromHeaders(req));
	
	const user = await DatabaseWrapper.findOne(CUSTOMER_MODAL, payload.identity);
	if (!user) {
		return res.status(401)
			.json(errors.unauthorized);
	}
	
	req.userData = {
		...user,
		password: undefined
	};
	return next();
};

export const auth = {
	required: express_jwt({
		secret: process.env.JWT_KEY,
		userProperty: 'payload',
		getToken: getTokenFromHeaders
	}),
	optional: express_jwt({
		secret: process.env.JWT_KEY,
		userProperty: 'payload',
		getToken: getTokenFromHeaders,
		credentialsRequired: false
	}),
	addUserData
};
