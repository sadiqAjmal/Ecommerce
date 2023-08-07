import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth-page/login-page';
import Signup from './components/auth-page/sign-up';
import NewPassword from './components/auth-page/new-pass';
import ForgotPassword from './components/auth-page/forgot-pass';
import { Routes,Route } from 'react-router';
import Home from './components/home-page';
import Cart from './components/cart';
import Orders from './components/order-page';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProducts } from './Redux/slices/products-slice';
import AdminPage from './components/admin/admin-page';
import VerifyUser from './components/verify-user';
function App() {
  const dispatch=useDispatch();
  const sortBy=useSelector((store)=>store.products.sortBy);
  const loginInfo = useSelector((store) => store.auth);
 
 useEffect(()=>{ 
  dispatch(fetchProducts( {sortBy:sortBy,
    skip:0,
    limit:8,
    find:"",
  })) },[]);
  return (
      <Routes>
      <Route path="/" element={(loginInfo.role==='admin')?<AdminPage/>:<Home/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path='/signUp' element={<Signup/>}></Route>
      <Route exact path='/reset' element={<ForgotPassword/>}></Route>
      <Route exact path="/cart" element={<Cart/>}> </Route>
      <Route  exact path="/orders" element={<Orders/>}></Route>
      <Route path="/newpass/:token" element={<NewPassword/>} />
      <Route path="/verify-user/:token" element={<VerifyUser/>} />
    </Routes>
  );
}
export default App;