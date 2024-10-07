const BaseError = require('./base.error');

const {StatusCodes} = require('http-status-codes');
class NotImplemented extends BaseError {
    constructor(methodName) {
        super("NotImplemented", StatusCodes.NOT_IMPLEMENTED,`${methodName} not implemented`,{});
    }
}
export default NotImplemented;