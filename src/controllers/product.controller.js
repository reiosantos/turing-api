/**
 * The Product controller contains all static methods that handles product request
 * Some methods work fine, some needs to be implemented from scratch while others may contain one or two bugs
 * The static methods and their function include:
 *
 * - getAllProducts - Return a paginated list of products
 * - searchProducts - Returns a list of product that matches the search query string
 * - getProductsByCategory - Returns all products in a product category
 * - getProductsByDepartment - Returns a list of products in a particular department
 * - getProduct - Returns a single product with a matched id in the request params
 * - getAllDepartments - Returns a list of all product departments
 * - getDepartment - Returns a single department
 * - getAllCategories - Returns all categories
 * - getSingleCategory - Returns a single category
 * - getDepartmentCategories - Returns all categories in a department
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { CATEGORY_MODAL, errors, PRODUCT_CATEGORY_MODAL, PRODUCT_MODAL } from '../constants';
import { Department, Sequelize } from '../database/models';
import Helpers from '../helpers';
import DatabaseWrapper from '../models';

const { Op } = Sequelize;

/**
 *
 *
 * @class ProductController
 */
class ProductController {
	/**
	 * get all products
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and product data
	 * @memberof ProductController
	 */
	static async getAllProducts(req, res, next) {
		let { description_length, offset, limit } = Helpers.paginate(req);
		try {
			const where = Sequelize.where(
				Sequelize.fn('CHAR_LENGTH', Sequelize.col('Product.description')),
				{ [Op.lte]: description_length });
			
			const products = await DatabaseWrapper.findAndCountAll(
				PRODUCT_MODAL, where, undefined, [], undefined,
				undefined, limit, offset);
			
			return res.status(200).json(products);
		} catch (error) {
			return res.status(400).json(errors.getError('PAY_03', '', 400, error.message));
		}
	}
	
	/**
	 * search all products
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and product data
	 * @memberof ProductController
	 */
	static async searchProduct(req, res, next) {
		const { query_string, all_words } = req.query;  // eslint-disable-line
		// all_words should either be on or off
		// implement code to search product
		return res.status(200).json({ message: 'this works' });
	}
	
	/**
	 * get all products by caetgory
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and product data
	 * @memberof ProductController
	 */
	static async getProductsByCategory(req, res, next) {
		try {
			const products = await ProductController.getProductsForCategory(req);
			return res.status(200).json({ count: products.length, rows: products });
		} catch (error) {
			return res.status(400).json(errors.getError('PAY_03', '', 400, error.message));
		}
	}
	
	static async getProductsForCategory(req) {
		let { offset, limit } = Helpers.paginate(req);
		const { category_id } = req.params;
		
		let products = await DatabaseWrapper.findAndCountAll(
			PRODUCT_CATEGORY_MODAL, { category_id }, undefined, undefined, undefined,
			undefined, limit, offset);
		
		products = products.rows.map(product => {
			return product.dataValues.product;
		});
		return products;
	}
	
	/**
	 * get all products by department
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and product data
	 * @memberof ProductController
	 */
	static async getProductsByDepartment(req, res, next) {
		try {
			const { department_id } = req.params;
			const categories = await DatabaseWrapper.findAndCountAll(CATEGORY_MODAL, { department_id }, undefined, []);
			
			const data = [];
			for (let i = 0; i < categories.rows.length; i++) {
				let category = categories.rows[i];
				req.params.category_id = category.dataValues.category_id;
				const dt = await ProductController.getProductsForCategory(req);
				data.push(...dt);
			}
			return res.status(200).json({ count: data.length, rows: data });
		} catch (error) {
			return res.status(400).json(errors.getError('PAY_03', '', 400, error.message));
		}
	}
	
	/**
	 * get single product details
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and product details
	 * @memberof ProductController
	 */
	static async getProduct(req, res, next) {
		
		try {
			const { product_id } = req.params;
			const products = await DatabaseWrapper.findOne(PRODUCT_MODAL, { product_id });
			return res.status(200).json(products);
		} catch (error) {
			return res.status(400).json(errors.getError('PAY_03', '', 400, error.message));
		}
	}
	
	/**
	 * get all departments
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status and department list
	 * @memberof ProductController
	 */
	static async getAllDepartments(req, res, next) {
		try {
			const departments = await Department.findAll();
			return res.status(200)
				.json(departments);
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 * Get a single department
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
	static async getDepartment(req, res, next) {
		const { department_id } = req.params; // eslint-disable-line
		try {
			const department = await Department.findByPk(department_id);
			if (department) {
				return res.status(200)
					.json(department);
			}
			return res.status(404)
				.json({
					error: {
						status: 404,
						message: `Department with id ${department_id} does not exist`  // eslint-disable-line
					}
				});
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 * This method should get all categories
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
	static async getAllCategories(req, res, next) {
		// Implement code to get all categories here
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * This method should get a single category using the categoryId
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
	static async getSingleCategory(req, res, next) {
		const { category_id } = req.params;  // eslint-disable-line
		// implement code to get a single category here
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * This method should get list of categories in a department
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 */
	static async getDepartmentCategories(req, res, next) {
		const { department_id } = req.params;  // eslint-disable-line
		// implement code to get categories in a department here
		return res.status(200)
			.json({ message: 'this works' });
	}
}

export default ProductController;
