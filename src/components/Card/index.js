import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/slices/cart-slice";
import { Card, Button } from "react-bootstrap";
import Price from "../price";
import "../price/style.css";
import { useNavigate } from "react-router";
function Element({ item }) {
  const btnVariant = item.quantity > 0 ? "primary" : "outline-danger";
  const btnText = item.quantity > 0 ? "Add to Cart" : "Out of Stock";
  const cartItems = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const loginInfo=useSelector((store)=>store.auth);
  const navigate=useNavigate();
  const isItemAdded = () => {
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === item._id) return true;
    }
    return false;
  };

  const isAdded = isItemAdded();

  return (
    <Card className="h-100 w-90">
      <div style={{ height: "250px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={item.image}
          className="img-fluid"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
        <div> 
          <p>{item.description}</p>
        </div>
        <div  className="d-flex justify-content-left">
        <Price className="price-card" price={item.price} />
        </div> 
        </Card.Text>
        <div/>
        <div className="mt-auto d-flex justify-content-end">
          <Button
            variant={btnVariant}
            onClick={() => {
              !loginInfo.token&&navigate('/login');
              loginInfo.token&&dispatch(addToCart({ ...item, quantity: 1 ,availableQuantity:item.quantity}));
            }}
            disabled={isAdded || item.quantity === 0}
          >
            {btnText}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default Element;