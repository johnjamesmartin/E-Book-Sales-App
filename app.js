/* Dependencies
 ****************************************************************/
const express = require('express');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

/* Handlebars middleware:
 ****************************************************************/
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/* Body parser middleware:
 ****************************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Static assets:
 ****************************************************************/
app.use(express.static(`${__dirname}/public`));

/* Routes
 ****************************************************************/
app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
