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
}

export default Helpers;
