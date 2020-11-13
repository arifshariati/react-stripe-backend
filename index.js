require("dotenv").config();
const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY);
const { v4: uuid } = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.post("/payment", (req, res) => {
  const { product, token } = req.body;

  const idempotencyKey = uuid();

  return stripe.customers
    .create({ email: token.email, source: token.id })
    .then((customer) => {
      return stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log(error));
});

//listen
const PORT = process.env.PORT ? process.env.PORT : 3000;
app.listen(PORT, () => console.log(`sever is listening now at PORT ${PORT}`));
