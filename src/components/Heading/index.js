import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav,Navbar,Form,Dropdown, Container } from "react-bootstrap";
function Heading()
{
return(
<Navbar variant="secondary"style={{ marginTop: `80px` }}>
    <Container fluid>
    <Navbar.Brand>
    Heading 1
    </Navbar.Brand>
<Navbar.Collapse className="justify-content-end">
<Nav>
<Form.Control

      aria-label="Small"
      aria-describedby="inputGroup-sizing-sm"
      placeholder="Search by name"
 />
  <Dropdown className="ml-3">
    <Dropdown.Toggle variant="light" id="dropdown-basic">
      Sort By
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Price: High to Low</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Name</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Nav>
</Navbar.Collapse>
    </Container>
</Navbar>);
}
export default Heading;