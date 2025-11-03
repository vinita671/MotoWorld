import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/uikit.min.css";
import "../assets/css/main.css";

export default function Header() {
  return (
    <>
      <header className="page-header page-header-transparent">
        <div className="page-header__inner">
          {/* ===== Left Section ===== */}
          <div className="page-header__left">
            <div className="logo">
              <NavLink className="logo__link" to="/">
                <div className="logo__icon">
                  <img src="src/assets/img/logo.svg" alt="MotoWorld" />
                </div>
                <div className="logo__text">MOTOWORLD</div>
              </NavLink>
            </div>
          </div>

          {/* ===== Center Nav ===== */}
          <div className="page-header__center">
            <nav className="page-nav" data-uk-navbar="true">
              <ul className="uk-navbar-nav">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/bikes">Bikes</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* ===== Right Section ===== */}
          <div className="page-header__right">
            <a className="uk-navbar-toggle cart-btn" href="#!">
              <div className="cart-btn__icon uk-icon" data-uk-icon="cart">
                <span className="cart-btn__count">2</span>
              </div>
            </a>
            {/* Sidebar Toggle */}
            <a
              className="uk-navbar-toggle menu-btn"
              href="#offcanvas"
              data-uk-toggle
            >
              <img src="src/assets/img/icons/menu.svg" alt="menu" />
            </a>
          </div>
        </div>
      </header>


      {/* ====== Sidebar (Offcanvas Menu) ====== */}
      <div id="offcanvas" data-uk-offcanvas="overlay: true; flip: true">
        <div className="uk-offcanvas-bar uk-flex uk-flex-column">

          <button
            className="uk-offcanvas-close"
            type="button"
            data-uk-close
           ></button>

          <h3 className="uk-text-bold uk-margin-small-top">Menu</h3>
          <ul className="uk-nav uk-nav-default uk-margin-top">
            <li>
              <NavLink to="/"> Home</NavLink>
            </li>
            <li>
              <NavLink to="/about"> About Us</NavLink>
            </li>
            <li>
              <NavLink to="/bikes"> Bikes</NavLink>
            </li>
            <li>
              <NavLink to="/login"> Login</NavLink>
            </li>
          </ul>

          <div className="uk-margin-top uk-text-center">
            <img
              src="src/assets/img/logo.svg"
              alt="MotoWorld"
              width="100"
              className="uk-margin-small-top"
            />
            <p className="uk-text-muted uk-margin-small-top">Ride with Passion </p>
          </div>
        </div>
      </div>
    </>
  );
}
