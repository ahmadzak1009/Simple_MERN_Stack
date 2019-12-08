import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import Navbar from "./components/Navbar";
import AddItem from "./components/admin/AddItem";
import AllItems from "./components/admin/AllItems";
import EditItem from "./components/admin/EditItem";
import ShirtDetails from "./components/shirt/ShirtDetails";

const App = props => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* CLIENT */}
        <Route path="/" exact component={Home} />
        <Route path="/shirt/:id" exact component={ShirtDetails} />

        {/* ADMIN */}
        <Route path="/admin" exact component={Admin} />
        <Route path="/admin/shirts" component={AllItems} />
        <Route path="/admin/shirt/add" component={AddItem} />
        <Route path="/admin/shirt/:id" component={EditItem} />
      </Switch>
    </Router>
  );
};

export default App;
