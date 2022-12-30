const express = require('express')
const cors = require('cors')

const errorController = require('./controllers/error');

const app = express()

var corsOptions = {
  origin: "http://localhost:8080"
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/user');

// users routes
app.use('/users', userRoutes)

// routes not found
app.use(errorController.notFound);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
