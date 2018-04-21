class Utils {
    constructor() { }

    /**	
     * Creates a callback that proxies node callback style arguments to an Express Response object.
     *	@param {express.Response} res	Express HTTP Response
     *	@param {number} [status=200]	Status code to send on success
     *
     *	@example
     *		list(req, res) {
     *			collection.find({}, toRes(res));
     *		}
    **/
    toRes(res) {
        return (err, data) => {
            return err ? res.status(500).send(err) : data && typeof data.toObject === 'function' ? data = data.toObject(): true;
        };
    }
}

module.exports = Utils;