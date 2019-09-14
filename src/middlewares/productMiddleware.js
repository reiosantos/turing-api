import { query } from 'express-validator/check';

class ValidatorHelper {
	static validateGetProducts = () => [
		query('page', 'PDT_01').optional().isNumeric(),
		query('limit', 'PDT_01').optional().isNumeric(),
		query('description_length', 'PDT_01').optional().isNumeric(),
	];
}

class ProductMiddleware {
	static validate(method) {
		if (method === 'getProducts') {
			return ValidatorHelper.validateGetProducts();
		} else {
			return [];
		}
	}
}

export default ProductMiddleware;
