import React, { useState, useEffect } from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import Logo from "./images/logoo.png";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`nav_start ${scroll ? 'scrolled' : ''}`}>
      <nav className={`navbar navbar-expand-lg elegant-navbar fixed-top`}>
        {/* Use 'container' for fixed-width with margins */}
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className='navbar_logo'><img src={Logo} alt='Logo' /></div>
          </Link>
          <button className="navbar-toggler" type="button" onClick={toggleNavbar} aria-expanded={!collapsed}>
            <span className="navbar-toggler-icon">
              {collapsed ? <FaBars className="text-white" /> : <FaTimes className="text-white" />}
            </span>
          </button>
          <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={toggleNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu" onClick={toggleNavbar}>Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ourstory" onClick={toggleNavbar}>Our Story</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={toggleNavbar}>Contact</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/team" onClick={toggleNavbar}>Our Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/autism" onClick={toggleNavbar}>Autism</Link>
              </li> */}
              
              <li className="nav-item">
                <a className="btn btn-elderly" href="https://foodieserendipity.netlify.app/cart" target="_blank" rel="noopener noreferrer" onClick={toggleNavbar}>
                  Cart
                </a>
                
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
