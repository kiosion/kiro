const express = require('express')
const app = express()

app.get('*', (req, res) => {
  res.status('200').send('<html><head><title>success</title></head><body><p>Hello World!</p></body></html>')
})

app.listen(3000)
