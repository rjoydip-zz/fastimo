const f = require('fastify')

const opt = {
  logger: true,
  PORT: 3000
}

class Component {
  render() {}
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
    return this.app.listen(opt.PORT).then((err, address) => {
      this.app.log(`Server is running ${address}`)
    })
  }

  render() {}
}

module.exports = new Application
