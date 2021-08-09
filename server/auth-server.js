const validation = require('./validation')
const casbin = require('../lib/casbin')

class AuthServer {
  // 获取最新 enforcer 实例；
  static async _getEnforcerInstance () {
    if (!enforcer) {
      console.error('enforcer instance is not found')
      await casbin()
    }
    return enforcer
  }

  // 操作权限
  static async operation (object) {
    // 参数校验
    const { method, args } = await validation.operationValidation(object)

    const e = await AuthServer._getEnforcerInstance()
    const casbinManagerApiResult = await e[method](...args)

    console.log(`method:${method},args:${args},result:${JSON.stringify(casbinManagerApiResult)}`)
    return casbinManagerApiResult
  }

  // 检查权限
  static async check (object) {
    // 参数校验
    const { sub, obj, act } = await validation.checkValidation(object)

    if (!sub || !obj || !act) {
      console.error('client missing args')
      return false
    }

    const e = await AuthServer._getEnforcerInstance()

    if ((await e.enforce(sub, obj, act)) === true) {
      console.log(`${sub} can ${act} ${obj}`)
      return true
    } else {
      console.log(`${sub} can not ${act} ${obj}`)
      return false
    }
  }
}

module.exports = AuthServer
