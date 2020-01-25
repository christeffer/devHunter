const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('your mongo url here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(cors()); // pode colocar endereço específico
app.use(express.json());
app.use(routes);

app.listen(3333);
