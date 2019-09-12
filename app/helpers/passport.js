import passport from 'passport';
import LocalStrategy from 'passport-local';
import {errors, CUSTOMER_MODAL} from '../constants';
import DatabaseWrapper from '../models';
import { validatePassword } from './auth.helpers';

passport.use(new LocalStrategy({

	usernameField: 'email',
	passwordField: 'password'

}, async (username, password, next) => {
	
	try {
		const user = await DatabaseWrapper.findOne(
			CUSTOMER_MODAL, { email: username }, undefined, undefined, false
		);
		if (!user) {
			return next(errors.invalidCredentials, false);
		}
		
		return validatePassword(password, user.password)
			.then((isValid) => {
				if (isValid) {
					return next(null, user);
				}
				return next(errors.invalidCredentials, false);
			})
			.catch(error => next(errors.getError('AUT_02', 'auth', 401), false));
	} catch (err) {
		return next(errors.getError('AUT_02', 'auth', 500, err.message), false)
	}
}));
