
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.set('port', port)

app.post('/api/login', (req, res, next) => {
  // Check what user has send
  // Compare password and usename to database maybe
  // If everything checks out, lets do the JWT key

  var token = jwt.sign({username: 'foobar',}, 'some_stupid_secret')
  res.json({token: token})
})

app.post('/api/secure', (req, res, next) => {
  jwt.verify(req.body.key, 'some_stupid_secret', (err, decoded) => {
    if(err) {
      res.status(401)
    } else {
      res.json(decoded)
    }
  })
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
