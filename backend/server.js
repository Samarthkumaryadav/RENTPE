const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const colors = require('colors')
const cors = require('cors')
const path = require('path')

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())


app.use('/api/articles',require('./routes/articleRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

app.use(errorHandler);

app.listen(port,()=>console.log("Server started at port: "+port))