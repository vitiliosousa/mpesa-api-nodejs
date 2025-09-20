require("dotenv").config();
const express = require("express");
const mpesa = require("./index"); // seu index.js com M-Pesa API
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Criar pool de conexão com MySQL
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "mpesa_user",
  password: process.env.MYSQL_PASSWORD || "mpesa_pass123",
  database: process.env.MYSQL_DATABASE || "mpesa_db",
});

// Função para salvar transação
async function saveTransaction(transaction) {
  const { amount, msisdn, transaction_ref, thirdparty_ref, status } =
    transaction;
  const query = `
        INSERT INTO transactions 
        (amount, msisdn, transaction_ref, thirdparty_ref, status) 
        VALUES (?, ?, ?, ?, ?)
    `;
  await db.execute(query, [
    amount,
    msisdn,
    transaction_ref,
    thirdparty_ref,
    status,
  ]);
}

// Endpoint C2B
app.post("/c2b", async (req, res) => {
  const { amount, msisdn, transaction_ref, thirdparty_ref } = req.body;
  try {
    // Salvar no banco
    const result = await mpesa.initiate_c2b(
      amount,
      msisdn,
      transaction_ref,
      thirdparty_ref
    );

    // Salvar no banco
    await saveTransaction({
      amount,
      msisdn,
      transaction_ref,
      thirdparty_ref,
      status: result.output_ResponseDesc, // ou result.output_ResponseCode se preferir
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Endpoint B2C
app.post("/b2c", async (req, res) => {
  const { amount, msisdn, transaction_ref, thirdparty_ref } = req.body;
  try {
    const result = await mpesa.initiate_c2b(
      amount,
      msisdn,
      transaction_ref,
      thirdparty_ref
    );

    // Salvar no banco
    await saveTransaction({
      amount,
      msisdn,
      transaction_ref,
      thirdparty_ref,
      status: result.output_ResponseDesc, // ou result.output_ResponseCode se preferir
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
