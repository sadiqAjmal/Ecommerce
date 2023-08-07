import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
function Heading({Title,Element,className}) {
  return (
    <Navbar variant="secondary">
      <Container fluid>
        <Navbar.Brand>{Title}</Navbar.Brand>
        <Navbar.Collapse className={className}>
          <Nav>
            {Element}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Heading;