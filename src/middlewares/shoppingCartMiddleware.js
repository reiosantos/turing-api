import { body } from 'express-validator/check';

class ValidatorHelper {
	static validateMakeCharge = () => [
		body('amount', 'DEP_01').isNumeric(),
		body('description', 'PAY_02').exists(),
		body('order_id', 'DEP_01').isNumeric(),
		body('stripeToken', 'PAY_02').exists(),
		body('currency', 'PAY_02').optional().isString()
	];
}

class ShoppingCartMiddleware {
	static validate(method) {
		if (method === 'makeCharge') {
			return ValidatorHelper.validateMakeCharge();
		} else {
			return [];
		}
	}
}

export default ShoppingCartMiddleware;
