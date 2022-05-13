const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
    res.status(201).json({ message: "Utilisateur créer", data: user, token });
  } catch (erreur) {
    res.status(500).json({ message: `erreur lors de l'inscription ${erreur}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne().where("email").equals(email);
    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
        res.json({ message: "connexion établie", token });
      } else {
        res.json({ message: "Mot de passe incorrect" });
      }
    } else {
      res.status(404).json({ message: "L'utilisateur n'existe pas" });
    }
  } catch (erreur) {
    res.status(500).json({ message: `erreur lors de la connexion ${erreur}` });
  }
});

function loggedIn(req, res, next) {
  // Bearer <token>
  let token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, payload) {
    if (err) {
      res.status(401).json({ message: "Veuillez vous connecter" });
    } else {
      req.payload = payload;
      next();
    }
  });
}

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id);
    res.json({ message: "utilisateur récuperer", data });
  } catch (erreur) {
    res.json({ message: "erreur" });
  }
});

router.get("/secret", loggedIn, async (req, res) => {
  res.json({ message: "Utilisateur authentifié" });
});

module.exports = { router, loggedIn };

// Accueil       /
// Inscription   /inscription
// Connexion     /connexion
// Profile       /profile
// Annonce       /annonce
// Panier        /panier

// NavBar

/*

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({ message: "donnee mise a jour", data: user });
  } catch (err) {
    res.status(404).json({ message: `id n'existe pas ${err}` });
  }
});

*/
