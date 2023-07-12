import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Navbar,Container } from 'react-bootstrap';
import {useDispatch } from 'react-redux';
import { updateProducts } from '../../Redux/ProductsSlice/productsSlice';
import items from '../ItemsTable/items';
const PaginationFooter = ({totalItems,itemsOnPage,itemString})=>{
  const dispatch= useDispatch();  
  let noPages=Math.ceil(totalItems/itemsOnPage);
    let active = 1;
    let nums = [];
for (let number = 1; number <=noPages ; number++) {
  nums.push(
    <Pagination.Item onClick={() => {
      console.log(number);
      let start = (number - 1) * 8;
      let end = start + 8;
      console.log(items.slice(start, end));
      dispatch(updateProducts(items.slice(start, end)));
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })}}     key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
    return(
        <>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand><p style={{fontSize:'0.75rem'}}>{totalItems} {itemString}</p></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            <Pagination size="sm">{nums}</Pagination>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  </>
);
}
export default PaginationFooter;