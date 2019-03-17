const express = require('express')

const {
  Budget
} = require('../models')

const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const budgets = await Budget.findAll()
    res.json(budgets)
  } catch (err) {
    return res.status(err.status).send({
      status: err.status,
      error: err.error
    })
  }
})

module.exports = router
