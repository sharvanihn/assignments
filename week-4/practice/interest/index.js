const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;
  res.send(sum.toString());
});

app.get("/interest", (req, res) => {
  const principal = parseInt(req.query.principal);
  const rate = parseInt(req.query.rate);
  const time = parseInt(req.query.time);
  const simpleInterest = (principal * rate * time) / 100;
  const total = principal + simpleInterest;
  res.json({
    total: total,
    interest: simpleInterest,
  });
});

app.listen(3001);
