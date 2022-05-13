require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection à la base de donnée établie"))
  .catch((erreur) => console.log(erreur));

const apiAnnonces = require("./api/apiAnnonces");
app.use("/annonce", apiAnnonces);

const apiPanier = require("./api/apiPanier");
app.use("/panier", apiPanier);

const apiUser = require("./api/apiUser");
app.use("/user", apiUser.router);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
