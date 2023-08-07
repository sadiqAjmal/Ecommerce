import React, { useState } from "react";
import PaginationFooter from "../../pagination";
import { getAdminOrders } from "../../../Redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";
import OrderTable from "../order-table";
import {  Form,Button,InputGroup } from "react-bootstrap";
import Heading from "../heading1";
import OrderHeading from "../order-heading";
import Loader from "../../loader";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const OrderPage = () => {
  const [searchInput, setInput] = useState('');
  const dispatch = useDispatch();
  const ordersInfo = useSelector((state) => state.order);
  const loginInfo = useSelector((state) => state.auth);
  const [searchCount, setCount] = useState(0);
  const [searchSuccess, setSuccess] = useState(false);
  const [searchPending, setSearchPending] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchOrder = async ({ limit, skip, toSearch }) => {
    try {
      setSearchPending(true);
      const response = await axios.post(
        'http://localhost:5000/v1/admin/search-order',
        { limit: limit, skip: skip, toSearch: toSearch },
        {
          headers: {
            Authorization: `Bearer ${loginInfo.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSearchPending(false);
      return response.data;
    } catch (err) {
      setSuccess(false);
      throw err;
    }
  };

  const onPending = [{
    orderNo: <Loader />,
    date: <Loader />,
    products: { length: <Loader /> },
    userName: <Loader />,
    amount: <Loader />,
  }];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (searchInput) {
      try {
        setLoading(true);
        const foundItem = await searchOrder({ limit: 10, skip: 0, toSearch: searchInput });
        if (foundItem) {
          setSuccess(true);
          setCount(foundItem.count);
          setFoundItems(foundItem.foundItems);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setSearchFailed(true);
      }
    }
  };

  const searchOnClick = async (skip) => {
    try {
      setSearchPending(true);
      const foundItem = await searchOrder({ limit: 10, skip: skip, toSearch: searchInput });
      if (foundItem) {
        setSuccess(true);
        setCount(foundItem.count);
        setFoundItems(foundItem.foundItems);
      }
      setSearchPending(false);
    } catch (err) {
      console.log(err);
      setSearchPending(false);
    }
  };

  return (
    <>
      <OrderHeading/>
      {searchSuccess && (
        <div>
          <Button className="btn-link btn-lg text-decoration-none" onClick={() => {
            setSuccess(false);
            setSearchPending(false);
            setInput("");
          }}>
            <FiArrowLeft />
          </Button>
        </div>
      )}
        <Heading
          className="justify-content-end"
          Title="Orders"
          Element={
            <Form onSubmit={handleFormSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  key="search-order"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Search by user or orderID"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ width: "200px" }}
                />
                <Button variant="outline-secondary" type="submit">
                  Search
                </Button>
              </InputGroup>
            </Form>
          }
        />
      {searchFailed && <div>Search failed. Please try again.</div>}
      {loading && <div>Loading...</div>}
      <OrderTable items={searchPending ? onPending : (searchSuccess ? foundItems : ordersInfo.Orders)} />
      <PaginationFooter
        totalItems={searchSuccess ? searchCount : ordersInfo.count}
        itemsOnPage={10}
        itemString={"Total Orders "}
        onPageChange={async (number) => {
          let skip = (number - 1) * 10;
          searchSuccess ? searchOnClick(skip) : dispatch(getAdminOrders({ skip: skip, limit: 10, token: loginInfo.token }));
        }}
      />
    </>
  );
};

export default OrderPage;