const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose');
const express = require('express');
const apiRouter = require('./routes/api.js');

const app = express();
// MONGO URI
const MONGO_URI = 'mongodb+srv://jsuldev:Makoto97!@cluster0.8gnpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// parses request to allow us to access req.body etc
app.use(express.json());
// parses incoming encoded url requests
app.use(express.urlencoded({ extended: true }))

// connection to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // set the name of the DB
  dbName: 'MyFirstDatabase'
})
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.log(err));

// route handlers
app.use('/api', apiRouter);
// serve up static file from index.html
// route handler to respond with main app
app.use('/', express.static(path.join(__dirname, '../client/')));


// error handlers
// local error handler (404)
app.use((req, res) => {
  res.sendStatus(404);
})
// global error handler (500) for serverside internal errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// export/listening statemtn
module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));