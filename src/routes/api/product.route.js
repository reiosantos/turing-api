import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import Helpers from '../../helpers';
import ProductMiddleware from '../../middlewares/productMiddleware';

const router = Router();
router.get('/products', ProductMiddleware.validate('getProducts'),
	Helpers.returnErrors, ProductController.getAllProducts);
router.get('/products/search', ProductMiddleware.validate('searchProducts'),
	Helpers.returnErrors, ProductController.searchProduct);
router.get('/products/inCategory/:category_id', ProductMiddleware.validate('getProductInCategory'),
	Helpers.returnErrors, ProductController.getProductsByCategory);
router.get('/products/inDepartment/:department_id', ProductMiddleware.validate('getProductInDepartment'),
	Helpers.returnErrors, ProductController.getProductsByDepartment);
router.get('/products/:product_id', ProductMiddleware.validate('getOneProduct'),
	Helpers.returnErrors, ProductController.getProduct);

router.get('/departments', ProductController.getAllDepartments);
router.get('/departments/:department_id', ProductController.getDepartment);
router.get('/categories', ProductController.getAllCategories);
router.get('/categories/:category_id', ProductController.getSingleCategory);
router.get('/categories/inDepartment/:department_id', ProductController.getDepartmentCategories);

export default router;
