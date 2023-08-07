import express from 'express';
const router = express.Router();
import { order,getOrders } from '../controllers/orders';
router.post('/fetchOrders',async(req,res)=>{
  try{
    console.log("req");
    await getOrders(req,res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating products.' });
  }
})
router.put('/',async(req,res)=>{
  try{

    console.log("/");
    await order(req,res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating products.' });
  }
})
export default router;
