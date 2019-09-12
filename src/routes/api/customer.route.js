import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import Helpers from '../../helpers';
import { auth } from '../../helpers/auth.helpers';
import CustomerMiddleware from '../../middlewares/customerMiddleware';

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
router.post('/customers/login', auth.optional, CustomerController.login);
router.post(
	'/customers',
	auth.optional,
	CustomerMiddleware.validate('createUser'),
	Helpers.returnErrors,
	CustomerController.create);
router.get('/customer', CustomerController.getCustomerProfile);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
