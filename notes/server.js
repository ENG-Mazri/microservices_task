const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes/routes')

const PORT = process.env.PORT | 5000
const app = express()
app.use(cors())
app.use(express.json())

app.use(router)
const db = require("./models");
db.noteDB.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


app.listen(PORT , ()=>console.log(`Notes server is listening on ${PORT}`))
