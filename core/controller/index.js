class Controller {
    constructor(req, res, options) {
        this.req = req
        this.res = res
        this.options = options ? options : {}
    }

    index() {
        console.log("Index fn of controller")
    }

    render(pageName, data) {
        console.log(pageName, data)
    }
}

module.exports = Controller