import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
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
                <Footer />
              </>
            }
          ></Route>
          <Route exact path="/botForm" element={<><Container />
                <Footer /></>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
