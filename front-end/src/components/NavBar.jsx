import React, { useContext } from "react";
import { state } from "../Context";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function NavBar() {
  let { stateNavBar, setstateNavBar } = useContext(state);

  const deconnexion = () => {
    localStorage.removeItem("token");
    setstateNavBar("");
  };

  // stateNavBar === "" ? <div> connexion / inscription </div> : <div> annonce / panier </div>
  return (
    <nav>
      <h1>
        <Link to="/" className="links">
          VSHOP
        </Link>
      </h1>
      {stateNavBar === "" ? (
        <ul className="identification">
          <li>
            <Link to="/login" className="links buttonLi">
              Connexion
            </Link>
          </li>
          <li>
            <Link to="/signup" className="links buttonLi">
              Inscription
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="identification navBarConnecter">
          <li>
            <Link to="/annonce" className="links buttonLi">
              Annonce
            </Link>
          </li>
          <li>
            <Link to="/panier" className="links buttonLi">
              Panier
            </Link>
          </li>
          <li>
            <div className="links buttonLi" onClick={deconnexion}>
              Deconnexion
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
}
