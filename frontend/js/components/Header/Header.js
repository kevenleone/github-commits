import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import './Header.scss';

function callLogout() {
  // eslint-disable-next-line no-alert
  const shouldLogout = window.confirm(`${window.user.name}, you sure you want logout?`);
  if (shouldLogout) {
    window.location.href = '/logout';
  }
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="HeaderComponent">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">GitHub Commits</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar />
          <p className="user_name">
            Welcome, {window.user.name} <br />
            <button className="logout" type="button" onClick={callLogout}>
              Logout
            </button>
          </p>
          <img alt="user" className="user_avatar" src={window.user.avatar_url} />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
