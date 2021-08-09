const join = require('path').join
const fs = require('fs')

const routerHelper = {
  _getRoutes: stack => {
    const routes = (stack || [])
      // We are interested only in endpoints and router middleware.
      .filter(it => it.route || it.name === 'router')
      // The magic recursive conversion.
      .reduce((result, it) => {
        if (!it.route) {
          const fPath = it.regexp
            .toString()
            .substring(3, it.regexp.toString().indexOf('\\/?'))
          // We are handling a router middleware.
          const stack = it.handle.stack
          stack.forEach(s => (s.route.path = fPath + s.route.path))
          const routes = routerHelper._getRoutes(stack)

          return result.concat(routes)
        }

        // We are handling an endpoint.
        const methods = it.route.methods
        const path = it.route.path

        const routes = Object.keys(methods).map(m => [m.toUpperCase(), path])

        return result.concat(routes)
      }, [])
      // We sort the data structure by route path.
      .sort((prev, next) => {
        const [prevPath] = prev
        const [nextPath] = next

        if (prevPath < nextPath) {
          return -1
        }

        if (prevPath > nextPath) {
          return 1
        }

        return 0
      })

    return routes
  },
  routerRegister: async app => {
    const routerPath = join(__dirname, '../router')
    const stat = fs.statSync(routerPath)
    if (!stat.isDirectory()) {
      throw new Error(`${routerPath} is not a Directory`)
    } else {
      const routerFileNames = fs.readdirSync(routerPath)
      routerFileNames.forEach(filename => {
        const routerFileFullName = join(routerPath, filename)
        const routerFileName = filename.split('.')[0]
        app.use(`/${routerFileName}`, require(routerFileFullName))
      })
      console.log('################################')
      console.log('所有注册的 RESTful Endpoints: ')
      const rs = routerHelper._getRoutes(app._router.stack)
      rs.forEach(r => console.log(`${r[0]} -> ${r[1]}`))
      console.log('################################')
    }
  }
}

module.exports = routerHelper
