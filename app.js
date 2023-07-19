const express = require('express')
require('dotenv').config()
const path = require('path')
const morgan = require('morgan')
const hbs = require('hbs')
const cors = require('cors')
const utility = require('./helpers/utility')
const { MSG } = require('./helpers/constants/constants')

const indexRouter = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// eslint-disable-next-line no-underscore-dangle
app.engine('html', hbs.__express)

app.use(cors())

app.use(
  morgan('dev', {
    skip: (req) => req.originalUrl === '/health-check',
  }),
)

app.use(
  express.json({
    limit: '100mb',
    extended: true,
  }),
)
app.use(
  express.urlencoded({
    limit: '100mb',
    extended: false,
  }),
)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, _res, next) => {
  req.language = 'en'
  for (let i; i < Object.keys(MSG).length; i += 1) {
    if (Object.keys(MSG)[i] === req.headers['accept-language']) {
      req.language = req.headers['accept-language']
    }
  }
  next()
})

app.use('/', indexRouter)

app.use('/health-check', (_req, res) => {
  res.status(200).send('Healthy')
})

// catch 404 and forward to error handler
app.use((req, res, _next) => {
  // next(createError(404))
  res.status(404).send(utility.errorRes(MSG[req.language].notFound))
})

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', err)
})

module.exports = app
