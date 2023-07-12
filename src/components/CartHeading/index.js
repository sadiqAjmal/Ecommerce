import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
function CartHeading(props) {
  return (

    <Navbar variant="dark" bg="dark" style={{marginTop:'80px',marginBottom:'2%'}} >
      <Link to={props.backPath}>
                     <Button size='xs' variant='dark'> 
                     <FaArrowLeft className="text-light"/>
                     </Button>
</Link>
      <Container>
        <Navbar.Brand>
            <span>{props.title}
            </span>
            </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CartHeading;