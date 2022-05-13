import React, { useState, useContext, useEffect } from "react";
import { state } from "../Context";

export default function Annonce() {
  const { stateNavBar } = useContext(state);

  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setphoto] = useState("");
  const [quantity, setquantity] = useState(0);
  const [prix, setprix] = useState(0);
  const [ID, setID] = useState("");

  const [listID, setlistID] = useState([]);
  const [listAnnonce, setlistAnnonce] = useState([]);

  const ajouterAnnonce = () => {
    let produit = {
      nom,
      description,
      photo,
      quantity,
      prix,
    };
    // Authorization : Bearer <TOKEN>
    fetch("/annonce", {
      method: "POST",
      body: JSON.stringify(produit),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateNavBar}`,
      },
    })
      .then((data) => data.json())
      .then((resultat) => setlistAnnonce((prev) => [resultat.data, ...prev]))
      .catch((erreur) => console.log(erreur));
  };

  const updateAnnonce = () => {
    let produit = {
      nom,
      description,
      photo,
      quantity,
      prix,
    };
    fetch(`/annonce/${ID}`, {
      method: "PUT",
      body: JSON.stringify(produit),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateNavBar}`,
      },
    })
      .then((data) => data.json())
      .then((resultat) => console.log(resultat))
      .catch((erreur) => console.log(erreur));
  };

  useEffect(() => {
    fetch("/annonce/getAnnonceUtilisateur", {
      headers: { Authorization: `Bearer ${stateNavBar}` },
    })
      .then((data) => data.json())
      .then((resultat) => setlistID(resultat.data))
      .catch((erreur) => console.log(erreur));
  }, [stateNavBar]);

  useEffect(() => {
    listID.forEach((id) => {
      fetch(`/annonce/${id}`)
        .then((data) => data.json())
        .then((resultat) => setlistAnnonce((prev) => [resultat.data, ...prev]))
        .catch((erreur) => console.log(erreur));
    });
  }, [listID]);

  const supprimerAnnonce = (id) => {
    fetch(`/annonce/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${stateNavBar}` },
    })
      .then((data) => data.json())
      .then((resultat) => {
        let newAffichage = listAnnonce.filter((annonce) => annonce._id !== id);
        setlistAnnonce(newAffichage);
      })
      .catch((erreur) => console.log(erreur));
  };

  const updateAffichageForm = (produit) => {
    setnom(produit.nom);
    setprix(produit.prix);
    setphoto(produit.photo);
    setdescription(produit.description);
    setquantity(produit.quantity);
    setID(produit._id);
  };

  return (
    <div>
      <h1>Page Annonce</h1>
      <div className="formAnnonce">
        <input
          type="text"
          placeholder="Nom du produit"
          value={nom}
          onChange={(event) => setnom(event.target.value)}
        />
        <br /> <br />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(event) => setprix(event.target.value)}
        />
        <br /> <br />
        <input
          type="number"
          placeholder="quantité disponible"
          value={quantity}
          onChange={(event) => setquantity(event.target.value)}
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Description du produit"
          value={description}
          onChange={(event) => setdescription(event.target.value)}
        />
        <br /> <br />
        <input
          type="text"
          placeholder="Photo du produit"
          value={photo}
          onChange={(event) => setphoto(event.target.value)}
        />
        <br /> <br />
        <button className="ajouterAnnonce" onClick={ajouterAnnonce}>
          Créer l'annonce
        </button>
        <button className="updateAnnonce" onClick={updateAnnonce}>
          Update l'annonce
        </button>
      </div>
      {listAnnonce.lenght === 0 ? (
        <h1>Vous n'avez aucune annonce</h1>
      ) : (
        listAnnonce.map((produit) => (
          <div className="containerDetail" key={produit._id}>
            <img src={produit.photo} alt="produit" className="imageDetail" />
            <div>
              <h1 className="nomDetail">{produit.nom}</h1>
              <b>Prix: {produit.prix} $</b>
              <p>Quantity: {produit.quantity}</p>
              <p>{produit.description}</p>
            </div>
            <button
              className="deleteAnnonce"
              onClick={() => supprimerAnnonce(produit._id)}
            >
              Supprimer l'annonce
            </button>
            <button
              className="update"
              onClick={() => updateAffichageForm(produit)}
            >
              Update
            </button>
          </div>
        ))
      )}
    </div>
  );
}
