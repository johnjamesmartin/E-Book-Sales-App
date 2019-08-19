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
  res.render('index', {
    stripePublishableKey: process.env.STRIPE_PUB_KEY
  });
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.post('/charge', (req, res) => {
  const amount = 1500;
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Web Development - Ultimate Ebook',
        currency: 'gbp',
        customer: customer.id
      })
    )
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
