const router = require('express').Router()

const { status } = require('../../helpers/constants/constants')
const utility = require('../../helpers/utility')

router.get('/', (req, res) => res.status(status.SUCCESS).send(utility.successRes([], 'Attandance App Rest API')))

module.exports = router
