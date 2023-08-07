import React from "react"
import { Container } from "react-bootstrap"
import { useSelector,useDispatch } from "react-redux"
import ProductsTable from "../products-table"
import { fetchProducts } from "../../../Redux/slices/products-slice"
import PaginationFooter from "../../pagination"
const ProductsPage=()=>{
    const dispatch=useDispatch();
    const sortBy=useSelector((store)=>(store.products.sortBy));
    const onPageChange=(number)=>{
        let skip = (number - 1) * 8;
        dispatch(fetchProducts({sortBy:sortBy,skip:skip,limit:8}));
    }
    const count=useSelector((store)=>store.products.count);  
    return(
<Container>
<ProductsTable />
<PaginationFooter totalItems={count} itemsOnPage={8} itemString={"Items Avaialable"}
    onPageChange={onPageChange}
    />
</Container>);
}
export default ProductsPage;