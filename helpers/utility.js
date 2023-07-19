const https = require('https')
const http = require('http')
const jwt = require('jsonwebtoken')

class Utility {
  static successRes(data, message = '') {
    return {
      status: 'success',
      message,
      data,
    }
  }

  static errorRes(message, errorStatus = 'error') {
    return { status: errorStatus, message }
  }

  static conflictRes(message, errorStatus = 'conflict') {
    return { status: errorStatus, message }
  }

  static getUrlRequest(url) {
    let data
    return new Promise((res) => {
      https.get(url, (resp) => {
        resp.on('data', (chunk) => {
          if (chunk !== undefined) data += chunk
        })
        resp.on('end', () => {
          res(data)
        })
      })
    })
  }

  static generateToken(userData, token = false) {
    if (token) {
      return jwt.sign(userData, process.env.KEY, { expiresIn: '7d' })
    }
    return jwt.sign(userData, process.env.KEY, { expiresIn: '12h' })
  }

  static generateRefreshToken(userData) {
    return jwt.sign(userData, process.env.KEY, { expiresIn: '10m' })
  }

  static pushKeyValueArray(arr, key, value, extra = {}) {
    if (value !== undefined && value !== null) {
      return arr.push({ key, value, ...extra })
    }
    return null
  }

  static dateConverter(inputDate, format = '-') {
    const fullDate = new Date(inputDate)
    let twoDigitMonth = `${fullDate.getMonth() + 1}`
    if (twoDigitMonth.length === 1) twoDigitMonth = `0${twoDigitMonth}`
    let twoDigitDate = `${fullDate.getDate()}`
    if (twoDigitDate.length === 1) twoDigitDate = `0${twoDigitDate}`
    return twoDigitDate + format + twoDigitMonth + format + fullDate.getFullYear()
  }

  static jsISOdateToTime(inputDate) {
    return inputDate.toString()
  }

  static capitalizeString(str) {
    if (!str) return null
    const trimmedStr = str.trim()
    const normalizedStr = trimmedStr.replace(/\s{2,}/g, ' ')
    const words = normalizedStr.split(' ')
    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase()
      const restOfWord = word.slice(1).toLowerCase()
      return firstLetter + restOfWord
    })
    return capitalizedWords.join(' ')
  }

  static getIP() {
    return new Promise((resolve) => {
      http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
        resp.on('data', (ip) => {
          resolve(ip.toString())
        })
      })
    })
  }

  static saltRounds() {
    return Math.round(Math.random() * 10)
  }

  static generateOTP(length) {
    const chars = '0123456789'
    let otp = ''

    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      otp += chars[randomIndex]
    }
    return otp
  }
}

module.exports = Utility
