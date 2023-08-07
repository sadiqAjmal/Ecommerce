import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {logOut} from '../../Redux/slices/auth-slice'; // Corrected import statement
import { getOrder,resetOrderStatus } from '../../Redux/slices/order-slice';
import { updateCart } from '../../Redux/slices/cart-slice';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
function LoggedIn() {
  const Navigate=useNavigate();
  const OrderInfo=useSelector((store)=>store.order)
  const dispatch = useDispatch();
  const LoginInfo = useSelector((store) => store.auth);
  const [orderSuccessful,setOrderSuccess]=useState(false);
  useEffect(()=>{
    if(orderSuccessful)
    {Navigate('/orders')
    dispatch(resetOrderStatus);
    setOrderSuccess(false);
  }
  });
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {LoginInfo.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {(LoginInfo.role==='user')&&<Dropdown.Item onClick={async ()=>{
          dispatch(getOrder({skip:0,limit:8,token:LoginInfo.token}));
          setOrderSuccess(true);
        }}>Orders</Dropdown.Item>}
        <Dropdown.Item onClick={() =>{
           dispatch(logOut())
           dispatch(updateCart([]));
          Navigate('/')
          }
        }>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default LoggedIn;
