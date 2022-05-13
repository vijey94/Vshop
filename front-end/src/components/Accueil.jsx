import React, { useState, useEffect, useContext } from "react";
import { state } from "../Context";
import { useHistory } from "react-router-dom";
import "./styles/accueil.css";

export default function Accueil() {
  const [listAnnonce, setlistAnnonce] = useState([]);

  let { stateNavBar } = useContext(state);

  let history = useHistory();

  // 1er cas: pas de deuxieme parametre => se lance a chaque fois que l'un de nos state est mise à jours
  // 2ème cas: deuxieme parametre : []  => se lance seulement au lancement de la page ( équivalent du onLoad )
  // 3ème cas: useEffect sera a l'écoute de la modification d'une variable => se lance a chaque fois que la variable change de valeur

  useEffect(() => {
    fetch("/annonce")
      .then((data) => data.json())
      .then((resultat) => {
        setlistAnnonce(resultat.data);
        console.log(resultat);
      })
      .catch((erreur) => console.log(erreur));
  }, []);

  const achatProduit = (id) => {
    console.log(id);
    // fetch /produit -> POST
    fetch("/panier", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateNavBar}`,
      },
    })
      .then((data) => data.json())
      .then((resultat) => history.push("/panier"))
      .catch((erreur) => console.log(erreur));
  };

  return (
    <div>
      <h1> Page d'accueil </h1>
      <div className="containerProduit">
        {listAnnonce.map(({ _id, nom, prix, quantity, description, photo }) => {
          return (
            <div key={_id} className="produit">
              <img src={photo} alt="Produit" className="imgProduit" />
              <h2>{nom}</h2>
              <p>{prix} $</p>
              <p>{description}</p>
              <p>{quantity}</p>
              <button className="buttonAchat" onClick={() => achatProduit(_id)}>
                Achat
              </button>
              <button
                className="buttonDetail"
                onClick={() => history.push(`/annonce/${_id}`)}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
