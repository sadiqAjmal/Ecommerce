import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Display from './components/display-card';
import Header from './components/Header';
import Heading from './components/Heading';
import LoginPage from './components/LoginPage';
import CartHeading from './components/CartHeading';
import { Routes,Route } from 'react-router';
import CartTable from './components/ItemsTable';
import CartFooter from './components/CartFooter';
import OrderTable from './components/OrderTable';
import Home from './components/HomePage';
import SideBar from './components/OrdeDetails';
import orders from './components/OrderTable/Order';
import RemoveAlert from './components/DeleteItem';
import Cart from './components/Cart';
import Orders from './components/OrderPage';
import SignUpPage from './components/SignUp';
import ResetPage from './components/ForgotPass';
import NewPass from './components/NewPass'
function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route exact path="/login" element={<LoginPage/>}></Route>
      <Route exact path='/signUp' element={<SignUpPage/>}></Route>
      <Route exact path='/reset' element={<ResetPage/>}></Route>
      <Route exact path="/cart" element={<Cart/>}> </Route>
      <Route  exact path="/orders" element={<Orders/>}></Route>
      </Routes>
      );
}
export default App;