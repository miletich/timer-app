import React from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const Navigation = () =>
  <Navbar inverse staticTop>
    <Navbar.Header>
      <Navbar.Brand>
        React Timer App
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey={1}>Timer</NavItem>
        </IndexLinkContainer>
        <LinkContainer to="/countdown">
          <NavItem eventKey={2}>Countdown</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <Navbar.Text>
          Created by{'  '}
          <Navbar.Link href="http://miletich.cc">Dušan Miletić</Navbar.Link>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default Navigation;
