const express = require('express')
const dayjs = require('dayjs')

const {
  Record
} = require('../models')

const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const {
      count = 10
    } = req.query
    const records = await Record.findAll({
      limit: count,
      order: [
        ['createdAt', 'DESC']
      ]
    })
    res.json(records)
  } catch (err) {
    console.error(err)
    return res.status(500).send(err.message)
    // return res.status(err.status).send({
    //   status: err.status,
    //   error: err.error
    // })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {
      body: {
        amount,
        type: tid,
        time,
        comment
      }
    } = req
    const record = await Record.create({
      amount,
      tid,
      comment,
      createdAt: time || dayjs().format()
    })
    res.json(record)
  } catch (err) {
    return res.status(err.status).send({
      status: err.status,
      error: err.error
    })
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {
      params: {
        id
      },
      body: {
        amount,
        type: tid,
        comment
      }
    } = req
    console.log(req.params)
    console.log(req.body)
    await Record.update({
      amount, tid, comment
    }, { where: { id: parseInt(id) } })
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(err.status).send({
      status: err.status,
      error: err.error
    })
  }
})

module.exports = router
