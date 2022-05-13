const express = require("express");
const router = express.Router();
const apiUser = require("./apiUser");

const Produit = require("../models/Produit");
const User = require("../models/User");

router.post("/", apiUser.loggedIn, async (req, res) => {
  try {
    let { id } = req.body;
    let utilisateur = await User.findById(req.payload.id);
    // id représente le produit ( l'annonce ) qu'on a envie d'acheter
    utilisateur.panier.push(id);
    await utilisateur.save();
    res.json({ message: "annonce ajouter au panier", id });
  } catch (erreur) {
    res.json({ message: "erreur lors de l'ajout au panier" + erreur });
  }
});

router.get("/", apiUser.loggedIn, async (req, res) => {
  try {
    let utilisateur = await User.findById(req.payload.id);
    let data = utilisateur.panier;
    res.json({ message: "Donnée récuperée", data });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Produit.findById(id);
    res.json({ message: "Donnée récuperée", data });
  } catch (erreur) {
    res.status(404).json({ message: `ID Incorrect ${erreur}` });
  }
});

router.delete("/:id", apiUser.loggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let utilisateur = await User.findById(req.payload.id);
    utilisateur.panier = utilisateur.panier.filter(
      (idProduit) => idProduit != id
    );
    await utilisateur.save();
    res.json({ message: "annonce supprimer du panier" });
  } catch (erreur) {
    res.status(404).json({ message: `ID Incorrect ${erreur}` });
  }
});

// On ajoute le BODY seulement avec les API POST et les API PUT
// SI ON A UN BODY, IL FAUT TOUJOURS RAJOUTER DANS LE HEADER LE CONTENT-TYPE : APPLICATION/JSON

module.exports = router;
