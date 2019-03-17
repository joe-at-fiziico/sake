const express = require('express')

const {
  Type
} = require('../models')

const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const types = await Type.findAll()
    res.json(types)
  } catch (err) {
    return res.status(err.status).send({
      status: err.status,
      error: err.error
    })
  }
})

module.exports = router
