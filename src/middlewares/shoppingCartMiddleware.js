import { body, param } from 'express-validator/check';

class ValidatorHelper {
	static validateMakeCharge = () => [
		body('amount', 'DEP_01').isNumeric(),
		body('description', 'PAY_02').exists(),
		body('order_id', 'DEP_01').isNumeric(),
		body('stripeToken', 'PAY_02').exists(),
		body('currency', 'PAY_02').optional().isString()
	];
	static validateAddItemToCart = () => [
		body('cart_id', 'PAY_02').exists(),
		body('product_id', 'DEP_01').isNumeric(),
		body('attributes', 'PAY_02').exists(),
		body('quantity', 'PAY_02').exists(),
	];
	static validateGetCart = () => [
		param('cart_id', 'PAY_02').exists(),
	]
}

class ShoppingCartMiddleware {
	static validate(method) {
		if (method === 'makeCharge') {
			return ValidatorHelper.validateMakeCharge();
		} else if (method === 'addItemToCart') {
			return ValidatorHelper.validateAddItemToCart();
		} else if (method === 'getCart') {
			return ValidatorHelper.validateGetCart();
		}else {
			return [];
		}
	}
}

export default ShoppingCartMiddleware;
