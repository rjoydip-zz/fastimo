/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

const f = require('fastify')

const Component = require('./lib/utils')
const opt = {
  logger: true,
  PORT: 3000
}
class Application extends Component {
  constructor(options) {
    super()
    this.app = f(options || opt)
    this.init()
    this.routes()
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('hello')
    })
  }

  init() {
    return this.app.listen(opt.PORT).then((_, address) => {
      this.app.log(`Server is running ${address}`)
    })
  }

  render() {
    return ('Hello')
  }
}

module.exports = new Application
