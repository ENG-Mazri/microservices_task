const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes/routes')

const PORT = process.env.PORT | 3333
const app = express()
app.use(cors())
app.use(express.json())

app.use(router)
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.listen(PORT , ()=>console.log(`Users server is listening on ${PORT}`))
