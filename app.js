const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const db = require('./models') // 引入資料庫
const port = 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
