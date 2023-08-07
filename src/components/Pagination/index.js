import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Navbar, Container } from 'react-bootstrap';

const PaginationFooter = ({ totalItems, itemsOnPage, itemString, onPageChange }) => {
  let noPages = Math.ceil(totalItems / itemsOnPage);
  const [active, setActive] = useState(1);
  let nums = [];

  const handlePageClick = (number) => {
    onPageChange(number);
    setActive(number);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = 1;
    let endPage = noPages;

    if (noPages > maxPagesToShow) {
      const currentPage = active;
      const middlePages = Math.floor(maxPagesToShow / 2);

      startPage = Math.max(currentPage - middlePages, 1);
      endPage = Math.min(currentPage + middlePages, noPages);

      if (endPage - startPage + 1 < maxPagesToShow) {
        if (currentPage <= middlePages) {
          endPage = maxPagesToShow;
        } else {
          startPage = noPages - maxPagesToShow + 1;
        }
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      nums.push(
        <Pagination.Item
          onClick={() => handlePageClick(number)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
  };

  getPageNumbers();

  return (
    <>
      <Navbar style={{ marginTop: '5%' }} className="bg-body-tertiary">
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Navbar.Brand>
            <p style={{ fontSize: '0.75rem' }}>{totalItems} {itemString}</p>
          </Navbar.Brand>
          <Navbar.Text>
            <Pagination size="sm">{nums}</Pagination>
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default PaginationFooter;
