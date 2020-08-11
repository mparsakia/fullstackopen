// *************************************************************
// utils/logger.js -- this module handles all printing to the console
// *************************************************************

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}