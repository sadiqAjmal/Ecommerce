import React,{useState} from 'react';
import { Container, Table } from 'react-bootstrap';
import { FiArrowUp } from 'react-icons/fi';
import Price from '../price';
import SideBar from '../order-details';
function OrderTable(props) {
 const [showOrder,setShow]=useState(false);
  const { items } = props;
  const [item,setItem]=useState({_id:null,
    userId:null,
    userName:null,
    userEmail:null,
    date:null,    
    products:[],
    amount:null})
  const handleAction=(item)=>{
    setItem(item)
    setShow(true);
  }
  const handleClose=()=>{
    setItem({_id:null,
      userId:null,
      userName:null,
      userEmail:null,
      date:null,    
      products:[],
      amount:null})
    setShow(false);
  }
  return (
    <>
     <SideBar show={showOrder} handleClose={handleClose} items={item}/>
    <Container class="container-sm" fluid>
      <Table borderless hover responsive size="sm">
        <thead className='table-secondary'>
          <tr>
            <th>Date</th>
            <th>Order#</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
              <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.orderNo}</td>
              <td>{item.products.length}</td>
              <td>
                <Price className="price-cart" price={item.amount} />
              </td>
              <td>
                <button
                  onClick={() => handleAction(item)}
                  className="btn btn-link"
                >
                  <FiArrowUp style={{ transform: 'rotate(45deg)' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  );
}
export default OrderTable;
