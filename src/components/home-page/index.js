import {React,useEffect} from "react";
import Header from "../header";
import Heading from "../heading";
import Display from "../display-card";
import PaginationFooter from "../pagination";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts} from "../../Redux/slices/products-slice";
function Home()
{
    const dispatch=useDispatch();
    const items = useSelector((state) => state.products.products);
    const sortBy=useSelector((store)=>(store.products.sortBy));
    const find=useSelector((store)=>store.products.find);
    useEffect(()=>{
        dispatch(fetchProducts({sortBy:sortBy,skip:0,limit:8,find:find})); 
    },[sortBy])
    const onPageChange=(number)=>{
        let skip = (number - 1) * 8;
        dispatch(fetchProducts({sortBy:sortBy,skip:skip,limit:8,find:find}));
    }
    const count=useSelector((store)=>store.products.count);  
    return(
        <>
    <Header/>
    <Heading/>
    <Display items={items}/>
    <PaginationFooter totalItems={count} itemsOnPage={8} itemString={"Items Avaialable"}
    onPageChange={onPageChange}
    />
    </>);
}
export default Home;