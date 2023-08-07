import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch,useSelector} from "react-redux";
import { Nav, Navbar, Form, Dropdown, Container } from "react-bootstrap";
import {setFind,fetchProducts, updateSort } from "../../Redux/slices/products-slice";
function Heading() {
  const searchInput=useSelector((store)=>store.products.find)
  const sortBy=useSelector((store)=>store.products.sortBy);
  const dispatch = useDispatch();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchProducts({sortBy:sortBy,find:searchInput,skip:0,limit:8}));
  };
  return (
    <Navbar variant="secondary" style={{ marginTop: `80px` }}>
      <Container style={{ marginRight: "5%", marginLeft: "5%" }} fluid>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Form onSubmit={handleFormSubmit}>
              <Form.Control
                key="search-for-product"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Search by name"
                type="text"
                value={searchInput} // Bind the value to the state
                onChange={(e) => dispatch(setFind(e.target.value))} // Update the state on input change
              />
              <button type="submit" style={{ display: "none" }}></button>
            </Form>
            <Dropdown className="ml-3" drop="down-centered">
    <Dropdown.Toggle variant="light" id="dropdown-basic">
      Sort By
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={async ()=>{
        dispatch(updateSort({price:-1}))
        console.log(searchInput);
      }}>
      Price: High to Low</Dropdown.Item>
      <Dropdown.Item onClick={async ()=>{
        dispatch(updateSort({price:1}))
      }} >Price: Low to High</Dropdown.Item>
      <Dropdown.Item onClick={async ()=>{
        dispatch(updateSort({name:1}))
      }}
        >Alphabets A-Z</Dropdown.Item>
       <Dropdown.Item onClick={async ()=>{
        dispatch(updateSort({name:-1}))
      }}>Alphabets Z-A</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Heading;