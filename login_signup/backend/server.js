const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.use(express.json());
const route1 = require('./route1');


// app.get('/', (req, res) => {
//     res.json('Hello World!')
//   })

app.use('/route_1', route1)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})