'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
// src/index.js
var express_1 = require('express')
var app = (0, express_1.default)()
var port = process.env.PORT || 3000
app.get('/', function (req, res) {
  res.send('Express + TypeScript Server!')
})
app.listen(port, function () {
  console.log('[server]: Server is running at http://localhost:'.concat(port))
})
