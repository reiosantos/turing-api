import passport from 'passport';
import LocalStrategy from 'passport-local';
import { CUSTOMER_MODAL, errors } from '../constants';
import DatabaseWrapper from '../models';

passport.use(new LocalStrategy({
	
	usernameField: 'email',
	passwordField: 'password'
	
}, async (username, password, next) => {
	
	try {
		const user = await DatabaseWrapper.findOne(CUSTOMER_MODAL, { email: username });
		if (!user) {
			return next(errors.invalidCredentials, false);
		}
		
		const data = user.getSafeDataValues();
		return user.validatePassword(password, data.password)
			.then((isValid) => {
				if (isValid) {
					return next(null, user);
				}
				return next(errors.invalidCredentials, false);
			})
			.catch(error => next(errors.getError('AUT_02', 'auth', 401), false));
	} catch (err) {
		return next(errors.getError('AUT_02', 'auth', 500, err.message), false);
	}
}));
