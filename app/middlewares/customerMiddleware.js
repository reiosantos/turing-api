import { body, param } from 'express-validator/check';

class ValidatorHelper {
	static validateCreateUser = () => [
		body('name', 'USR_10').exists(),
		body('email', 'USR_03').isEmail(),
		body('password', 'USR_11').exists()
	];
}

class CustomerMiddleware {
	static validate(method) {
		switch (method) {
			case 'createUser':
				return ValidatorHelper.validateCreateUser();
			case 'getUser':
				return [
					param('userId', 'DEP_01').isNumeric()
				];
			default:
				return [];
		}
	}
}

export default CustomerMiddleware;
