require('dotenv').config();
const express = require('express');
const mpesa = require('./index'); // importa seu index.js
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint C2B
app.post('/c2b', async (req, res) => {
  const { amount, msisdn, transaction_ref, thirdparty_ref } = req.body;
  try {
    const result = await mpesa.initiate_c2b(amount, msisdn, transaction_ref, thirdparty_ref);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Endpoint B2C
app.post('/b2c', async (req, res) => {
  const { amount, msisdn, transaction_ref, thirdparty_ref } = req.body;
  try {
    const result = await mpesa.initiate_b2c(amount, msisdn, transaction_ref, thirdparty_ref);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
