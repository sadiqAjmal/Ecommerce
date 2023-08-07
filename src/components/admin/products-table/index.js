import TableHeader from "../../table-header";
import { Table,Button } from "react-bootstrap";
import { useSelector,useDispatch} from "react-redux";
import { fetchProducts } from "../../../Redux/slices/products-slice";
import Heading from "../heading1";
import Action from "../edit-product";
import { FiArrowUp,FiTrash} from "react-icons/fi";
import Price from "../../price";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertModal from "../../modal";
const Titles=["Title","Price","Stock","Action"];
const ProductsTable=()=>{
    const handleRemove = async (item, token) => {
        try {
          console.log(item);
          const response = await axios.delete("http://localhost:5000/v1/admin/delete-product", {
            data: { id: item._id }, // Pass the data in the 'data' property
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          console.log("Error updating product:", error);
          throw error;
        }
    }      
    const [showAlert,setShowAlert]=useState(false);
    const [removeItem,setRemoveItem]=useState(null);
    const token=useSelector((store)=>store.auth.token)
    const ModalButtons=()=>{
        return(
          <>
          <Button variant='primary' onClick={async ()=>{await handleRemove(removeItem,token)
          setShowAlert(false);
          console.log("Deleted");
          }}> Yes</Button>
          <Button variant='outline-primary' onClick={()=>{setShowAlert(false)}}>No</Button>
          </>
        )
      }
      const dispatch=useDispatch();
      const sortBy=useSelector((store)=>(store.products.sortBy));
    const [action,setAction]=useState(false);
    const [item,setItem]=useState({});
    const [isNewProduct,setIsNewProduct]=useState(false);
    const items=useSelector((store)=>store.products.products);
    useEffect(()=>{
        dispatch(fetchProducts({sortBy:sortBy,skip:0,limit:8}));
    },[showAlert,action,dispatch,sortBy]);
    return(
        <>
        <AlertModal show={showAlert} Title={"Remove Alert"} Body={"Are you sure you want to remove this item?"} onHide={() => setShowAlert(false)} ModalButtons={<ModalButtons/>}/>
        <Action show={action} handleClose={()=>{setAction(false)}} item={item } isNewProduct={isNewProduct}/>
        <Heading className="justify-content-end" Title="Products" Element={
    <Button variant="primary" onClick={()=>{
        setIsNewProduct(true);
        setItem({});
        setAction(true);
    }}>
        Add New
    </Button>}/>
    <Table hover responsive>
        <TableHeader  titles={Titles}/>
        <tbody>
            {
                items.map((item)=>(
                    <tr key={item._id}>
                        <td>
                        <img src={item.image} alt={item.title} width="50" height="50" />
                        {item.name}-{item.description}
                        </td>
                        <td className="text-center">
                            <Price className="price" price={item.price}/>
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">  
                <button  className="btn btn-link" onClick={()=>{
                    setItem({...item});
                    setAction(true);
                    setIsNewProduct(false);
                }}>
                  <FiArrowUp style={{ transform: 'rotate(45deg)' }} />
                </button>
                <button className="btn btn-link" onClick={()=>{
                    setShowAlert(true);
                    setRemoveItem(item);
                }}>
                  <FiTrash />
                </button>
                </td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
    </>);
}
export default ProductsTable;