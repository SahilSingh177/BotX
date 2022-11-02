import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
import { BotLinkSec } from './components/BotLinkSection';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <BotLinkSec/>
      <Footer />
    </div>
  );
}

export default App;
