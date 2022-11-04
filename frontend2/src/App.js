import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Container } from "./components/Container";
import { BotLinkSec } from "./components/BotLinkSection";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <NavBar />
                <Banner />
                <BotLinkSec />
              </>
            }
          ></Route>
          <Route exact path="/botForm" element={<><Container /></>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
