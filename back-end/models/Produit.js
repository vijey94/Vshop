const mongoose = require("mongoose");

const produitSchema = mongoose.Schema({
  nom: String,
  prix: Number,
  description: String,
  photo: String,
  categorie: String,
  quantity: { type: Number, default: 1 },
});

const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
