import { errors } from '../constants';

class Helpers {
	static async returnErrors(req, res, next) {
		const _errors = await req.getValidationResult();
		if (_errors.isEmpty()) {
			return next();
		}
		const responseErrors = _errors.array()
			.map(error => errors.getError(error.msg, error.param));
		return res.status(400)
			.json(
				errors.getError('USR_02', 'validation', 400, responseErrors));
	}
	
	static paginate(req) {
		const { query } = req;
		let { page = 0, limit: pageSize = 20, description_length = 200 } = query;
		
		page = Number.parseInt(page);
		pageSize = Number.parseInt(pageSize);
		description_length = Number.parseInt(description_length);
		
		if (page < 0) page = 0;
		const offset = pageSize * page;
		const limit = offset + pageSize;
		return { description_length, offset, limit };
	}
}

export default Helpers;
