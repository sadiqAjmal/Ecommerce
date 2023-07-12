import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Slice/cartSlice';
import { Card, Button } from 'react-bootstrap';
import { decrementQuantity } from '../../Redux/ProductsSlice/productsSlice';
import Price from '../Price';
import '../Price/style.css';
function Element({item}) {
  const btnVariant=item.quantity>0?"primary":"outline-danger";
  const btnText=item.quantity>0?"Add to Cart":"Out of Stock";
  const cartItems=useSelector((state)=>state.cart.value);
  const dispatch=useDispatch();
  const isItemAdded=()=>
  {
    for(let i=0;i<cartItems.length;i++)
    {
      if(cartItems[i].name===item.name)
      return true;
    }
    return false;
  }
  const [isAdded,setIsAdded]=useState(isItemAdded(isItemAdded));
  return (
    <Card variant="dark" style={{ width: "100%", height:'100%', padding: "5%" }}>
      <Card.Img variant="top" src={item.image} style={{ width: "100%", height: "100%" }} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <Price className="price" price={item.price} />
        </Card.Text>
        <Button variant={btnVariant} onClick={()=>{
          dispatch(addToCart({...item,quantity:1}));
          setIsAdded(true)
          dispatch(decrementQuantity(item))
        }} 
        disabled={isAdded||(item.quantity===0)}>
         {btnText}</Button>
         </Card.Body>
    </Card>
  );
}
export default Element;