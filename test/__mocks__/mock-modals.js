import MailHelper from '../../src/helpers/email';
import StripeHelper from '../../src/helpers/stripe';
import ModelFactory from '../../src/models/models.factory';
import sinon from 'sinon';

let sandbox = sinon.createSandbox();

let createResult = {};
let findAllResult = {};
let findAndCountAllResult = {};
let findByPkResult = {};
let findOneResult = {};
let updateResult = {};
let destroyResult = {};

function spreadMockData(data) {
	createResult = data['createResult'] || createResult;
	findAllResult = data['findAllResult'] || findAllResult;
	findAndCountAllResult = data['findAndCountAllResult'] || findAndCountAllResult;
	findByPkResult = data['findByPkResult'] || findByPkResult;
	findOneResult = data['findOneResult'] || findOneResult;
	updateResult = data['updateResult'] || updateResult;
	destroyResult = data['destroyResult'] || destroyResult;
}

export function mockModel(modal, data = {}) {
	const MockModel = ModelFactory.getModel(modal);
	spreadMockData(data);
	
	sandbox.stub(MockModel, 'create').returns(createResult);
	sandbox.stub(MockModel, 'findAll').returns(findAllResult);
	sandbox.stub(MockModel, 'findAndCountAll').returns(findAndCountAllResult);
	sandbox.stub(MockModel, 'findByPk').returns(findByPkResult);
	sandbox.stub(MockModel, 'findOne').returns(findOneResult);
	sandbox.stub(MockModel, 'update').returns(updateResult);
	sandbox.stub(MockModel, 'destroy').returns(destroyResult);
}

export function mockModelFunction(modal, functionName, data) {
	const MockModel = ModelFactory.getModel(modal);
	try {
		MockModel[functionName].restore();
	} catch (e) {}
	sandbox.stub(MockModel, functionName).returns(data);
}

export function mockClassMethod(className, method, data) {
	try {
		className[method].restore();
	} catch (e) {}
	sandbox.stub(className, method).returns(data);
}

export function mockStripe(returnData) {
	try {
		StripeHelper.makeCharge.restore();
	} catch (e) {}
	sandbox.stub(StripeHelper, 'makeCharge')
		.returns(returnData || Promise.resolve({ id: '1dfv5', paid: true }))
}

export function mockSendMail(returnData) {
	try {
		MailHelper.restore();
	} catch (e) {}
	sandbox.stub(MailHelper, 'sendMail')
		.returns(returnData || Promise.resolve({ id: '1dfv5', paid: true }))
}

export function clearMock() {
	createResult = {};
	findAllResult = {};
	findAndCountAllResult = {};
	findByPkResult = {};
	findOneResult = {};
	updateResult = {};
	destroyResult = {};
	sandbox.restore();
}
