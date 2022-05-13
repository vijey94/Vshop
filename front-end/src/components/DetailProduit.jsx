import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/detail.css";

export default function DetailProduit() {
  const [produit, setproduit] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`/annonce/${id}`)
      .then((data) => data.json())
      .then((resultat) => {
        console.log(resultat);
        setproduit(resultat.data);
      })
      .catch((erreur) => console.log(erreur));
  }, [id]);

  return (
    <div className="containerDetail">
      <img src={produit.photo} alt="produit" className="imageDetail" />
      <div>
        <p> ID: {produit._id}</p>
        <h1 className="nomDetail">{produit.nom}</h1>
        <b>Prix: {produit.prix} $</b>
        <p>Quantity: {produit.quantity}</p>
        <p>{produit.description}</p>
      </div>
    </div>
  );
}
