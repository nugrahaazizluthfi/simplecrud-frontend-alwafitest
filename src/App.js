import React from 'react';
import AlWafiTes from "./containers/index";
import "./App.css";
import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AlWafiTes />
      </Router>
    </React.Fragment>
  );
}

export default App;
