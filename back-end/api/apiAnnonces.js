const express = require("express");
const router = express.Router();
const apiUser = require("./apiUser");

const Produit = require("../models/Produit");
const User = require("../models/User");

router.post("/", apiUser.loggedIn, async (req, res) => {
  try {
    let data = await Produit.create(req.body);
    let utilisateur = await User.findById(req.payload.id);
    utilisateur.annonce.push(data);
    await utilisateur.save();
    res.status(201).json({ message: "Donnée insérer", data });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await Produit.find();
    res.json({ message: "Donnée récuperée", data });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
});

router.get("/getAnnonceUtilisateur", apiUser.loggedIn, async (req, res) => {
  try {
    let utilisateur = await User.findById(req.payload.id);
    let data = utilisateur.annonce;
    res.json({ message: "Liste annonce de l'utilisateur", data });
  } catch (erreur) {
    res.status(500).json({ message: "Erreur " + erreur });
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
    let data = await Produit.findByIdAndDelete(id);
    let utilisateur = await User.findById(req.payload.id);
    utilisateur.annonce = utilisateur.annonce.filter(
      (idProduit) => idProduit != id
    );
    await utilisateur.save();
    res.json({ message: "donnée supprimée", data });
  } catch (erreur) {
    res.status(404).json({ message: `ID Incorrect ${erreur}` });
  }
});

router.put("/:id", apiUser.loggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Produit.findByIdAndUpdate(id, { $set: req.body });
    res.json({ message: "donnée mise à jour", data });
  } catch (erreur) {
    res.status(404).json({ message: `ID Incorrect ${erreur}` });
  }
});

module.exports = router;
