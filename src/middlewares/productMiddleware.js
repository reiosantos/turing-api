import { param, query } from 'express-validator/check';

class ValidatorHelper {
	static validateGetProducts = () => [
		query('page', 'PDT_01').optional().isNumeric(),
		query('limit', 'PDT_01').optional().isNumeric(),
		query('description_length', 'PDT_01').optional().isNumeric(),
	];
	static validateSearchProducts = () => [
		query('query_string', 'PAY_02').exists(),
		query('all_words', 'PDT_01').optional().custom((value) => {
			if (!value) {
				throw Error('Please input a value');
			}
			if (value.toLowerCase() !== 'on' && value.toLowerCase() !== 'off') {
				throw Error('Acceptable Values are: on/off');
			}
			return value;
		})
	];
}

class ProductMiddleware {
	static validate(method) {
		switch (method) {
			case 'getProducts':
				return ValidatorHelper.validateGetProducts();
			case 'getOneProduct':
				return [
					param('product_id', 'PAY_02').isNumeric()
				];
			case 'getProductInCategory':
				return [
					param('category_id', 'PAY_02').exists(),
					...ValidatorHelper.validateGetProducts()
				];
			case 'getProductInDepartment':
				return [
					param('department_id', 'PAY_02').exists(),
					...ValidatorHelper.validateGetProducts()
				];
			case 'searchProducts':
				return [
					...ValidatorHelper.validateSearchProducts(),
					...ValidatorHelper.validateGetProducts()
				];
			default:
				return [];
		}
	}
}

export default ProductMiddleware;
