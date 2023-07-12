import React,{useState} from 'react';
import { Container, Table } from 'react-bootstrap';
import { FiArrowUp } from 'react-icons/fi';
import Price from '../Price';
import SideBar from '../OrdeDetails';
function OrderTable(props) {
 const [showOrder,setShow]=useState(false);
  const { items } = props;
  const handleAction=()=>{
  setShow(true);
  }
  const handleClose=()=>{
    setShow(false);
  }
  return (
    <>
    <SideBar show={showOrder} handleClose={handleClose}/>
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
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.orderNo}</td>
              <td>{item.products}</td>
              <td>
                <Price className="price-cart" price={item.amount} />
              </td>
              <td>
                <button
                  onClick={() => handleAction(item.id)}
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
