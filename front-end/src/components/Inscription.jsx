import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { state } from "../Context";

export default function Inscription() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [photo, setphoto] = useState("");
  let { setstateNavBar } = useContext(state);

  let history = useHistory();

  const inscription = (event) => {
    event.preventDefault();
    let user = {
      nom,
      prenom,
      email,
      password,
    };
    fetch("/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((resultat) => {
        localStorage.setItem("token", resultat.token);
        setstateNavBar(resultat.token);
        history.push("/");
      })
      .catch((erreur) => console.log(erreur));
  };

  return (
    <div className="milieu">
      <h1 className="titre"> Sign Up </h1>
      <form onSubmit={inscription} className="form">
        <input
          type="text"
          placeholder="nom"
          className="inputForm"
          value={nom}
          onChange={(event) => setnom(event.target.value)}
        />
        <input
          type="text"
          placeholder="prenom"
          className="inputForm"
          value={prenom}
          onChange={(event) => setprenom(event.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          className="inputForm"
          value={email}
          onChange={(event) => setemail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="inputForm"
          value={password}
          onChange={(event) => setpassword(event.target.value)}
        />
        {/*   <input
          type="text"
          placeholder="Photo de profile"
          className="inputForm"
          value={photo}
          onChange={(event) => setphoto(event.target.value)}
        /> */}
        <button className="btnConnexion"> Connexion </button>
      </form>
    </div>
  );
}
