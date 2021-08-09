const validation = require('./validation')
const casbin = require('../lib/casbin')

class AuthServer {
  // 获取最新 enforcer 实例；
  static async getEnforcerInstance () {
    if (!enforcer) {
      console.error('checkAuth is not found enforcer instance')
      await casbin()
    }
    return enforcer
  }

  static async operation (object) {
    // 参数校验
    const { method, args } = await validation.operationValidation(object)

    const e = await AuthServer.getEnforcerInstance()
    const casbinManagerApiResult = await e[method](...args)
    console.log(`method:${method},args:${args},result:${JSON.stringify(casbinManagerApiResult)}`)
    return casbinManagerApiResult
  }

  static async check (object) {
    const { sub, obj, act } = object

    // 参数校验
    const value = await validation.check({ sub, obj, act })

    if (!sub || !obj || !act) {
      console.error('client missing args')
      return false
    }

    const e = await AuthServer.getEnforcerInstance()

    if ((await e.enforce(sub, obj, act)) === true) {
      logger.info(`${sub} can ${act} ${obj}`)
      return true
    } else {
      logger.info(`${sub} can not ${act} ${obj}`)
      return false
    }
  }
}

module.exports = AuthServer
