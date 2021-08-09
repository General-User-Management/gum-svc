const { RedisWatcher } = require('redis-watcher')
const { newEnforcer } = require('casbin')
const join = require('path').join
const TypeORMAdapter = require('typeorm-adapter')
const { logger } = require('dm-micro-service')
const qs = require('qs')

async function newEnforcerInstance (model, adapter, watcher) {
  const e = await newEnforcer(model, adapter)

  await e.enableAutoSave(true) // 打开自动保存

  await e.loadPolicy() // 下载策略

  if (!watcher) {
    watcher = await RedisWatcher.newWatcher(process.env.redis_uri)
  }
  e.setWatcher(watcher) // 配置观察者

  return e
}

async function initCasbin () {
  const model = join(__dirname, '../config/model.conf')

  const isHasAuthSource = !!/(.+)\?(.+)/.exec(process.env.db_uri)

  const adapterConfig = {
    type: 'mongodb',
    url: isHasAuthSource
      ? /(.+)\?(.+)/.exec(process.env.db_uri)[1]
      : process.env.db_uri,
    useUnifiedTopology: true,
    numberOfRetries: Number.MAX_VALUE
  }
  Object.assign(
    adapterConfig,
    qs.parse(isHasAuthSource ? /\?(.+)/.exec(process.env.db_uri)[1] : {})
  )

  const adapter = await TypeORMAdapter.default.newAdapter(adapterConfig)

  // Initialize the watcher.
  const watcher = await RedisWatcher.newWatcher(process.env.redis_uri)

  let e = await newEnforcerInstance(model, adapter, watcher)
  global.enforcer = e

  watcher.setUpdateCallback(async () => {
    logger.info('Casbin need update,reload Policy~~')
    e = await newEnforcerInstance(model, adapter)
    global.enforcer = e
  })
}

module.exports = initCasbin
