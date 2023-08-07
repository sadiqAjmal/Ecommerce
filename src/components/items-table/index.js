import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Button } from 'react-bootstrap';
import { FiTrash2 } from 'react-icons/fi';
import AlertModal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../Redux/slices/order-slice';
import { useNavigate } from 'react-router';
import { updateCart, incrementQuantity, decrementQuantity, sendOrder, setOrderArray } from '../../Redux/slices/cart-slice';
import CartFooter from '../cart-footer';
function CartTable(props) {
  const navigate = useNavigate();
  const loginInfo = useSelector((store) => store.auth);
  const token = loginInfo.token;
  const [selectedItems, setSelectedItems] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  const [removeAlert, setRemove] = useState(false);
  const [removeItem,setRemoveItem]=useState(null);
  const order = useSelector((store) => store.cart);
  const orderArray = order.orderArray;
  const handleRemoveItem = (item) => {
    setRemoveItem(item);
    setRemove(true);
  };
  const [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    dispatch(setOrderArray(tempArray));
  }, [tempArray, dispatch]);

  const handleRemove = (item) => {
    const updatedCart = cartItems.filter((i) => i._id !== item._id);
    dispatch(updateCart(updatedCart));
  };

  const handleQuantityChange = (item, num) => {
    num === 1 ? !(item.availableQuantity === item.quantity) && dispatch(incrementQuantity(item)) : item.quantity !== 1 && dispatch(decrementQuantity(item));
  };

  const handleCheckboxChange = (item, checked) => {
    if (checked) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        [item._id]: item.quantity,
      }));
      setTempArray((prevOrderArray) => [...prevOrderArray, item]);
    } else {
      setSelectedItems((prevSelectedItems) => {
        const updatedSelectedItems = { ...prevSelectedItems };
        delete updatedSelectedItems[item._id];
        return updatedSelectedItems;
      });
      setTempArray((prevOrderArray) => prevOrderArray.filter((i) => i._id !== item._id));
    }
  };
  const calculateTotal = () => {
    let subTotal = 0;
    for (const item of cartItems) {
      if (selectedItems[item._id]) {
        subTotal += item.price * item.quantity;
      }
    }
    const tax = 0;
    const total = subTotal;

    return { subTotal, tax, total };
  };

  const ModalButtons=()=>{
    return(
      <>
      <Button variant='primary' onClick={()=>{handleRemove(removeItem)
      setRemove(false);
      }}> Yes</Button>
      <Button variant='outline-primary' onClick={()=>{setRemove(false)}}>No</Button>
      </>
    )
  }
  return (
    <>
      <Container fluid>
      <AlertModal show={removeAlert} Title={"Remove Alert"} Body={"Are you sure you want to remove this item?"} onHide={() => setRemove(false)} ModalButtons={<ModalButtons/>}/>
        <Table hover responsive>
          <thead className="table-secondary">
            <tr>
              {props.Cart && (
                <th className="mb-3">
                </th>
              )}
              <th style={{ width: '20%' }}>{props.Cart ? 'Product' : 'Title'}</th>
              <th className="text-center" style={{ width: '10%' }}>
                Color
              </th>
              <th className="text-center" style={{ width: '10%' }}>
                Size
              </th>
             {props.Cart&& <th className="text-center" style={{ width: '15%' }}>
                    Available
              </th>}
              <th className="text-center" style={{ width: '15%' }}>
                Quantity
              </th>
              <th className="text-center" style={{ width: '15%' }}>
                Price
              </th>
              <th className="text-center" style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item) => (
              <React.Fragment key={item._id}>
                <tr>
                  {props.Cart && (
                    <td>
                      <input type="checkbox" checked={selectedItems[item._id] !== undefined} onChange={(e) => handleCheckboxChange(item, e.target.checked)} />
                    </td>
                  )}
                  <td>
                    <img src={item.image} alt={item.title} width="50" height="50" />
                    {item.name}
                  </td>
                  <td className="text-center">
                    {item.color?<><div
                      className="d-inline-block rounded-circle"
                      style={{
                        background: item.color,
                        width: '10%',
                        paddingTop: '10%',
                        marginRight: '2%',
                        border: '1px solid black',
                        verticalAlign: 'middle',
                      }}
                    ></div>
                    <span style={{ verticalAlign: 'middle' }}>{item.color}</span></>:<p>N/A</p>} </td>
                  <td className="text-center">{item.size?item.size:"N/A"}</td>
                  {(props.Cart)&&<td className='text-center'>{item.availableQuantity}</td>}
                  <td className="text-center">
                    <>
                      {props.Cart && (
                        <button className="btn btn-outline-dark btn-sm" onClick={() => handleQuantityChange(item, -1)} disabled={item.quantity === 1}>
                          -
                        </button>
                      )}
                      {item.quantity}
                      {props.Cart && (
                        <button className="btn btn-outline-dark btn-sm" onClick={() => handleQuantityChange(item, 1)}>
                          +
                        </button>
                      )}
                    </>
                  </td>
                  <td className="text-center">{`$${item.price}`}</td>
                  <td className="text-center">
                    {props.Cart && (
                      <button className="btn btn-outline-dark btn-sm" onClick={() => handleRemoveItem(item)}>
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        {props.Cart && (
          <CartFooter
            total={calculateTotal().total}
            tax={calculateTotal().tax}
            subTotal={calculateTotal().subTotal}
            handleClick={() => {
              if(orderArray.length===0)
              {
                alert("Please select items to cart first");
              }
              else{
                console.log("Order array",orderArray);
              dispatch(sendOrder({ orderArray, token }))
                .then((response) => {
                  dispatch(getOrder({ skip: 0, limit: 8, token: loginInfo.token }));
                  navigate('/orders');
                  dispatch(updateCart([]));
                })
                .catch((error) => {
                  console.error('Error placing order:', error);
                });
            }}}
          />
        )}
      </Container>
    </>
  );
}

export default CartTable;
