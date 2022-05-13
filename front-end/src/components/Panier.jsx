import React, { useEffect, useContext, useState } from "react";
import { state } from "../Context";

export default function Panier() {
  let { stateNavBar } = useContext(state);
  const [listProduit, setlistProduit] = useState([]);
  const [listID, setlistID] = useState([]);
  const [prixTotal, setprixTotal] = useState(0);

  useEffect(() => {
    fetch("/panier", {
      headers: { Authorization: `Bearer ${stateNavBar}` },
    })
      .then((data) => data.json())
      .then((resultat) => setlistID(resultat.data))
      .catch((erreur) => console.log(erreur));
  }, [stateNavBar]);

  useEffect(() => {
    listID.forEach((id) => {
      fetch(`/panier/${id}`)
        .then((data) => data.json())
        .then((produit) => setlistProduit((prev) => [produit.data, ...prev]))
        .catch((erreur) => console.log(erreur));
    });
  }, [listID]);

  useEffect(() => {
    /* let listPrix = listProduit.map((produit) => produit.prix);
    let resultat = listPrix.reduce((somme, prix) => (somme += prix), 0); */
    let resultat = listProduit.reduce(
      (somme, produit) => (somme += produit.prix),
      0
    );
    setprixTotal(resultat);
  }, [listProduit]);

  const supprimerProduit = (id) => {
    // /panier/:id -> DELETE
    fetch(`/panier/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${stateNavBar}` },
    })
      .then((data) => data.json())
      .then((resultat) => {
        let tmp = listProduit.filter((produit) => produit._id !== id);
        setlistProduit(tmp);
      })
      .catch((erreur) => console.log(erreur));
  };

  return (
    <div>
      <h1>Page Panier</h1>
      {console.log(listProduit)}
      {listProduit.length === 0 ? (
        <h1> Votre panier est vide ! </h1>
      ) : (
        listProduit.map((produit) => (
          <div className="containerDetail" key={produit._id}>
            <img src={produit.photo} alt="produit" className="imageDetail" />
            <div>
              <h1 className="nomDetail">{produit.nom}</h1>
              <b>Prix: {produit.prix} $</b>
              <p>Quantity: {produit.quantity}</p>
              <p>{produit.description}</p>
            </div>
            <button
              onClick={() => supprimerProduit(produit._id)}
              className="deleteAnnonce"
            >
              Supprimer du panier
            </button>
          </div>
        ))
      )}
      <h2>Total: {prixTotal} $</h2>
    </div>
  );
}
