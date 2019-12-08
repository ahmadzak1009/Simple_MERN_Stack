import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import Navbar from "./components/Navbar";
import AddItem from "./components/admin/AddItem";

const App = props => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* CLIENT */}
        <Route path="/" exact component={Home} />

        {/* ADMIN */}
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/item-add" component={AddItem} />
      </Switch>
    </Router>
  );
};

export default App;
