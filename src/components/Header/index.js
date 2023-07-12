import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBell, FaSignInAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header({ setShowCart, setShowOrders }) {
  const cartItems = useSelector((state) => state.cart.value);
  const [cartItemCount, setCartItemCount] = useState(cartItems.length);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <Navbar bg="light" variant="light" className="fixed-top">
      <Container>
        <Navbar.Brand href="/">ECommerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link>
              <Link to="/cart">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <FaShoppingCart className='text-black' size={20} />
                  {cartItemCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle p-1"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </div>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/notification">
                <Badge bg="light">
                  <FaBell className='text-black' size={20} />
                </Badge>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to='/login'>
                <Badge bg="light">
                  <FaSignInAlt className='text-black' size={20} />
                </Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
