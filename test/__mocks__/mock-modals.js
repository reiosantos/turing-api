import ModelFactory from '../../src/models/models.factory';
import sinon from 'sinon';

let sandbox = sinon.createSandbox();

let createResult = {};
let findAllResult = {};
let findByPkResult = {};
let findOneResult = {};
let updateResult = {};
let destroyResult = {};

function spreadMockData(data) {
	createResult = data['createResult'] || createResult;
	findAllResult = data['findAllResult'] || findAllResult;
	findByPkResult = data['findByPkResult'] || findByPkResult;
	findOneResult = data['findOneResult'] || findOneResult;
	updateResult = data['updateResult'] || updateResult;
	destroyResult = data['destroyResult'] || destroyResult;
}

export function mockModel(modal = 'customer', data = {}) {
	const MockModel = ModelFactory.getModel(modal);
	spreadMockData(data);
	
	sandbox.stub(MockModel, 'create').returns(createResult);
	sandbox.stub(MockModel, 'findAll').returns(findAllResult);
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

export function clearMock() {
	createResult = {};
	findAllResult = {};
	findByPkResult = {};
	findOneResult = {};
	updateResult = {};
	destroyResult = {};
	sandbox.restore();
}
