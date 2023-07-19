const router = require('express').Router()

const v1Router = require('./v1')
const { status } = require('../helpers/constants/constants')
const utility = require('../helpers/utility')

router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes([], 'Attandence App Version API')))

router.use('/v1', v1Router)

module.exports = router
