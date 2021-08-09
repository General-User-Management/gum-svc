const express = require('express')
const router = express.Router()
const AuthServer = require('../server/auth-server')

// operation policy
router.post('/operation', async function (req, res, next) {
  try {
    const requestParams = Object.assign({}, req.query, req.params, req.body)
    const operationResult = await AuthServer.operation(requestParams)
    res.json({ code: 0, data: operationResult })
  } catch (error) {
    next(error)
  }
})

// check policy
router.post('/check', async function (req, res, next) {
  try {
    const requestParams = Object.assign({}, req.query, req.params, req.body)
    const operationResult = await AuthServer.check(requestParams)
    res.json({ code: 0, data: operationResult })
  } catch (error) {
    next(error)
  }
})

module.exports = router
