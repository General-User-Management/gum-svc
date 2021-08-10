const express = require('express')
const router = express.Router()

// operation policy
router.get('/', async function (req, res) {
  res.json({ code: 0, data: 'ok' })
})

module.exports = router
