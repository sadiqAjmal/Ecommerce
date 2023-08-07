import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import LoggedIn from '../logged-in';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchProducts,updateCount,updateSort, resetFind } from '../../Redux/slices/products-slice';
function Header({ setShowCart, setShowOrders }) {
  const navigate=useNavigate();
  const sortBy=useSelector((store)=>store.products.sortBy)
  const cartItems = useSelector((state) => state.cart.value);
  const LoginInfo = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleRefresh=()=>{
    dispatch(fetchProducts({sortBy:sortBy,skip:0,limit:8,find:""}));
    dispatch(updateSort({createdAt:-1}));
    dispatch(resetFind());
    navigate("/")
  }
  return (
    <Navbar bg="light" variant="light" className="fixed-top">
      <Container>
      <Navbar.Brand as="button" onClick={handleRefresh} className="btn btn-link">ECommerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
          {LoginInfo.role==="user"&&<Nav.Link>
              <Link to={LoginInfo.token ? "/cart" : "/login"}>
                 <div style={{ position: 'relative', display: 'inline-block' }}>
                  <FaShoppingCart className='text-black' size={20} />
                  {cartItems.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle p-1"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </div>
              </Link>
            </Nav.Link>}
            <Nav.Link>
              {LoginInfo.token ? <LoggedIn /> :  <Link to='/login'>
                <Badge bg="light">
                  <FaSignInAlt className='text-black' size={20} />
                </Badge>
              </Link>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
