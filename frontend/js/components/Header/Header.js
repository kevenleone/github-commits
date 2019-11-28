import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import './Header.scss';

const Header = () => {
  const { user } = useSelector((state) => state.base);
  const [isOpen, setIsOpen] = useState(false);

  function callLogout() {
    // eslint-disable-next-line no-alert
    const shouldLogout = window.confirm(`${user.name}, you sure you want logout?`);
    if (shouldLogout) {
      window.location.href = '/logout';
    }
  }

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="HeaderComponent">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">GitHub Commits</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar />
          <p className="user_name">
            <span className="name">Welcome, {user.name}</span> <br />
            <button className="logout" type="button" onClick={callLogout}>
              Logout
            </button>
          </p>
          <img alt="user" className="user_avatar" src={user.avatar_url} />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
