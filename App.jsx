import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HowItWorks from "./components/HowItWorks";
import policeImage from "./assets/police.webp";
import martialart from "./assets/martial-art.png";
import safestRoute from "./assets/SafestRoute.jpg";
import contacts from "./assets/Contacts.png";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import SafestRoute from "./components/SafestRoute";
import logo from "./assets/logo.jpg";
// Define your routes with createBrowserRouter


// Home Component with full UI
const Home = () => {
  return (
    <div className="durlassa-wrapper">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="logo img" />
            {/* <h2>DURLASSA</h2> */}
          </div>
          <div className="navbar-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </nav>
      <div className="page-1">
        <header className="header">
          <h1>DURLASSA</h1>
        </header>

        <section className="hero-section">
          <h2 className="tagline">Your Safety, Our Priority</h2>
          <button className="sos-button">⚠️ Emergency</button>
        </section>
      </div>

      <div className="page-2">
        <section className="features-section">
          {/* POLICE CARD */}
          <div className="feature-card">
            <div className="card-top">
              <img src={policeImage} alt="Police Image" />
            </div>
            <div className="card-middle">
              <ul>
                <li>Locate nearest police stations</li>
                <li>Get directions instantly</li>
                <li>View station contact details</li>
              </ul>
            </div>
            <div className="card-bottom">
              <button className="police-btn">Find Nearby Police Stations</button>
            </div>
          </div>

          {/* SAFEST ROUTE CARD */}
          <div className="feature-card">
            <div className="card-top">
              <img src={safestRoute} alt="Safest route image" />
            </div>
            <div className="card-middle">
              <ul>
                <li>Green-route Safest route</li>
                <li>Yellow-route more details</li>
                <li>View station contact & Indicate Unsafety details</li>
              </ul>
            </div>
            <div className="card-bottom">
              <button className="police-btn" onClick={() => window.location.href = "/safest-route"}>
                Find Safest Route
              </button>
            </div>
          </div>

          {/* SELF DEFENCE COURSES */}
          <div className="feature-card">
            <div className="card-top">
              <img src={martialart} alt="Martial arts image" />
            </div>
            <div className="card-middle">
              <ul>
                <li>Learn effective self-defense techniques.</li>
                <li>Develop situational awareness and learn how to avoid potential threats.</li>
                <li>Boost confidence and mental resilience through hands-on training.</li>
              </ul>
            </div>
            <div className="card-bottom">
              <button className="police-btn">Learn Self-Defence</button>
            </div>
          </div>

          {/* EMERGENCY CONTACTS CARD */}
          <div className="feature-card">
            <div className="card-top">
              <img src={contacts} alt="Contacts Image" />
            </div>
            <div className="card-middle">
              <ul>
                <li>Save family, friends, or guardians as emergency contacts.</li>
                <li>Instantly notify all emergency contacts.</li>
                <li>Contacts receive alerts via SMS, call, and push notifications.</li>
              </ul>
            </div>
            <div className="card-bottom">
              <button className="police-btn">Add Contacts</button>
            </div>
          </div>
        </section>

        <div>
          <h1 style={{ textAlign: "center", marginTop: "60px" }}>How DURLASSA Works</h1>
          <HowItWorks />
        </div>

        <footer className="footer">
          <div className="footer-content">
            <h2 className="footer-logo">DURLASSA</h2>
            <p className="footer-tagline">Empowering Safety with Technology</p>

            <div className="footer-links">
              <a href="#about">About App</a>
              <a href="#features">Features</a>
              <a href="#helpline">Helpline</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-socials">
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </div>

            <p className="footer-copy">&copy; 2025 DURLASSA. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home component will render at the root URL
  },
  {
    path: "/safest-route",
    element: <SafestRoute />, // SafestRoute component will render for /safest-route
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
