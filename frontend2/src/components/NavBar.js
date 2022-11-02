import React from 'react';
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from '../assets/img/twitter.svg';
import navIcon2 from '../assets/img/github.svg';
import navIcon3 from '../assets/img/discord.svg';
import navIcon4 from '../assets/img/youtube.svg';

import {
  BrowserRouter as Router
} from "react-router-dom";

const headerImg = "https://user-images.githubusercontent.com/96344003/199616197-c9343447-5543-4ec1-85dd-2d916cb65fec.png";
export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
          <img src={headerImg} alt="Header Img"/> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>              
              <Nav.Link href="#botsection" className={activeLink === 'botsection' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('team')}>Explore</Nav.Link>

            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="https://discordapp.com/users/928575843641479198" target="_blank"><img src={navIcon3} alt="Discord" /></a>
                <a href="https://github.com/nodesxploit/testnet"target="_blank"><img src={navIcon2} alt="Github" /></a>
                <a href="https://twitter.com/nodexploit" target="_blank"><img src={navIcon1} alt="Twitter" /></a>
                </div>
                </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
