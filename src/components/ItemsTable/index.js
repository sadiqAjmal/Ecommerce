import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table,Container } from 'react-bootstrap';
import { FiTrash2 } from 'react-icons/fi';
import RemoveAlert from '../DeleteItem';
import { useDispatch,useSelector } from "react-redux";
import { updateCart } from "../../Redux/Slice/cartSlice";
function CartTable(props) {
  const [allSelected,setSelectAll]=useState(false);  
  const dispatch=useDispatch();
  const CartItems=useSelector((state)=>state.cart.value);
  const [removeAlert,setRemove]=useState(false);
  const handleRemoveItem=(item)=>{
    setRemove(true);
}
const handleRemove=(item)=>{
  const updatedCart=CartItems.filter((i)=>i.name!==item.name);
  dispatch(updateCart(updatedCart));
}
  return (
    <>
     <Container fluid>
      <Table borderless hover responsive size="sm">
        <thead className='table-secondary'>
          <tr>
            <th>{props.Cart&&<input type="checkbox"  onChange={()=>{setSelectAll(!allSelected);
            console.log(allSelected)

            }}/>}</th>
            <th>{props.Cart?"Product":"Title"}</th>
            <th>Color</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {CartItems.map((item) => (
              <>
              <RemoveAlert show={removeAlert} onHide={()=>setRemove(false)} setShow={setRemove} handleRemove={handleRemove} item={item}/>
              <tr key={item.id}>
              <td>
               {props.Cart&&<input type="checkbox" checked={allSelected} />}
              </td>
              <td>
                <img src={item.image} alt={item.title} width="50" height="50"/>
                {item.name}
              </td>
              <td>
                <div
                 className="d-inline-block rounded-circle" style={{background:item.color, width: '20px', height: '20px', marginRight: '5px'}}></div>
                <span>{item.color}</span>
              </td>
              <td>{item.size}</td>
              <td>
                {
                  props.Cart&&
                <button
                className='btn btn-outline-dark btn-sm'
                  onClick={() => (item, -1)}
                >
                  -
                </button>}
                {item.quantity}
                {props.Cart&&
                <button
                 className='btn btn-outline-dark btn-sm'
                  onClick={() => handleQuantityChange(item, 1)}
                >
                  +
                </button>}
              </td>
              <td>{item.price}</td>
              <td>
                {
                  props.Cart&&
                <button
                className='btn btn-outline-dark btn-sm'
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FiTrash2 />
                </button>}
              </td>
            </tr>
          </>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
}

export default CartTable;
