import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Accueil from "./components/Accueil";
import Inscription from "./components/Inscription";
import Connexion from "./components/Connexion";
import NavBar from "./components/NavBar";
import Panier from "./components/Panier";
import Annonce from "./components/Annonce";
import DetailProduit from "./components/DetailProduit";

import { state } from "./Context";
import { useState } from "react";

function App() {
  const token = localStorage.token ? localStorage.token : "";
  const [stateNavBar, setstateNavBar] = useState(token);

  return (
    <Router>
      <state.Provider value={{ stateNavBar, setstateNavBar }}>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Accueil />} />
          <Route exact path="/signup" render={() => <Inscription />} />
          <Route exact path="/login" render={() => <Connexion />} />
          <Route exact path="/panier" render={() => <Panier />} />
          <Route exact path="/annonce" render={() => <Annonce />} />
          <Route exact path="/annonce/:id" render={() => <DetailProduit />} />
        </Switch>
      </state.Provider>
    </Router>
  );
}

export default App;
