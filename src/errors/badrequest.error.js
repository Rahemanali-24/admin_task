import BaseErrord from './base.error';

const {StatusCodes} = require('http-status-codes');
class BadRequest extends BaseError {

    constructor(propertyName,details) {
        super("BadRequest", StatusCodes.BAD_REQUEST,`Invalid structure for ${propertyName} provided`,details);
    }
}

export default BadRequest;