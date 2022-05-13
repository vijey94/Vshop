import React, { useState, useContext } from "react";
import { state } from "../Context";
import { useHistory } from "react-router-dom";
import "./styles/connexion.css";

export default function Connexion() {
  const { setstateNavBar } = useContext(state);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history = useHistory();

  const connexion = (event) => {
    event.preventDefault();
    let user = { email, password };
    fetch("/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
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
      <h1 className="titre"> Login </h1>
      <form onSubmit={connexion} className="form">
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
        <button className="btnConnexion"> Connexion </button>
      </form>
    </div>
  );
}
