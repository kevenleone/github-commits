import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import './Header.scss';

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
          <span className="user_name">Welcome, {window.user.name}!</span>
          <img alt="user" className="user_avatar" src={window.user.avatar_url} />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
