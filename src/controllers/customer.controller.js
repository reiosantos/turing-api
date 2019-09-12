/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import passport from 'passport';
import { CUSTOMER_MODAL, errors } from '../constants';
import { toAuthJSON } from '../helpers/auth.helpers';
import DatabaseWrapper from '../models';

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
	/**
	 * create a customer record
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status, customer data and access token
	 * @memberof CustomerController
	 */
	static async create(req, res, next) {
		// Implement the function to create the customer account
		const { body: user } = req;
		try {
			let userData = await DatabaseWrapper.findOne(CUSTOMER_MODAL, { email: user.email });
			
			if (userData) {
				return res.status(400)
					.json(errors.getError('USR_04', 'email', 400));
			}
			const data = await DatabaseWrapper.createOne(CUSTOMER_MODAL, user);
			return res.status(201).json(toAuthJSON(data));
		} catch (err) {
			
			let resp = err.message;
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(400)
					.json(errors.getError('USR_04', 'email', 400));
			}
			return res.status(400)
				.json(errors.getError('USR_04', 'email', 400, resp));
		}
	}
	
	/**
	 * log in a customer
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status, and access token
	 * @memberof CustomerController
	 */
	static async login(req, res, next) {
		const { body: user } = req;
		
		if (!user.email) {
			return res.status(400)
				.json(errors.getError('USR_03', 'email', 400));
		}
		
		if (!user.password) {
			return res.status(400)
				.json(errors.getError('USR_11', 'password', 400));
		}
		
		return passport.authenticate('local', { session: false },
			(err, passportUser, info) => {
				if (err) {
					return res.status(err.status)
						.json(err);
				}
				
				const userObject = passportUser;
				if (userObject) {
					return res.json(toAuthJSON(userObject));
				}
				return res.status(401)
					.json(errors.getError('USR_01', 'email', 401, err || info));
			})(req, res, next);
	}
	
	/**
	 * get customer profile data
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status customer profile data
	 * @memberof CustomerController
	 */
	static async getCustomerProfile(req, res, next) {
		// fix the bugs in this code
		const { customer_id } = req;  // eslint-disable-line
		try {
			const customer = await Customer.findByPk(customer_id);
			return res.status(400)
				.json({
					customer
				});
		} catch (error) {
			return next(error);
		}
	}
	
	/**
	 * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status customer profile data
	 * @memberof CustomerController
	 */
	static async updateCustomerProfile(req, res, next) {
		// Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status customer profile data
	 * @memberof CustomerController
	 */
	static async updateCustomerAddress(req, res, next) {
		// write code to update customer address info such as address_1, address_2, city, region, postal_code, country
		// and shipping_region_id
		return res.status(200)
			.json({ message: 'this works' });
	}
	
	/**
	 * update customer credit card
	 *
	 * @static
	 * @param {object} req express request object
	 * @param {object} res express response object
	 * @param {object} next next middleware
	 * @returns {json} json object with status customer profile data
	 * @memberof CustomerController
	 */
	static async updateCreditCard(req, res, next) {
		// write code to update customer credit card number
		return res.status(200)
			.json({ message: 'this works' });
	}
}

export default CustomerController;
