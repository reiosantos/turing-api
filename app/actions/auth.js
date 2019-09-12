import passport from 'passport';
import {errors, CUSTOMER_MODAL} from '../constants';
import {generateJWTToken, hashPassword, toAuthJSON} from '../helpers/auth.helpers';
import DatabaseWrapper from '../models';

export const signup = async (req, res) => {
	const { body: user } = req;
	try {
		user.password = await hashPassword(user.password);
		const userData = await DatabaseWrapper.findOne(CUSTOMER_MODAL, { email: user.email });

		if (userData && userData.customer_id) {
			return res.status(400).json(errors.getError('USR_04', 'email', 400));
		}
		const data = await DatabaseWrapper.createOne(CUSTOMER_MODAL, user);
		const token = generateJWTToken(data);
		return res.status(201).json(toAuthJSON(data, token));
	} catch (err) {
		let resp = err.message;
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(400).json(errors.getError('USR_04', 'email', 400));
		}
		return res.status(400).json(errors.getError('USR_04', 'email', 400, resp));
	}
};

export const login = (req, res, next) => {
	const { body: user } = req;
	
	if (!user.email) {
		return res.status(400).json(errors.getError('USR_03', 'email', 400));
	}
	
	if (!user.password) {
		return res.status(400).json(errors.getError('USR_11', 'password', 400));
	}
	
	return passport.authenticate('local', { session: false },
		(err, passportUser, info) => {
			if (err) return res.status(err.status).json(err);
			
			const userObject = passportUser;
			if (userObject) {
				const token = generateJWTToken(userObject);
				return res.json(toAuthJSON(userObject, token));
			}
			return res.status(401).json(errors.getError('USR_01', 'email', 401, err||info));
		})(req, res, next);
};
