import Products from "../../models/products";
import Order from "../../models/orders";
import {nanoid} from 'nanoid';
function generateOrderNumber() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const randomNumber = Math.floor(Math.random() * 10000); 
  const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}-${randomNumber}`;
  return orderNumber;
}
const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);  


export const order = async (req, res) => {
  const cart = req.body;
  const {_id}=req.user;
  try {
    if (cart) {     
      const OrderNumber = generateOrderNumber();
      const newCart = await Promise.all(cart.map(async (item) => {
        const product = await Products.findOne({ _id: item._id }).lean();
        if (item.quantity > product.quantity) {
          throw new Error(`Quantity of product '${product.name}' exceeds available quantity.`);}
        return { ...product, quantity: product.quantity - item.quantity };}
      ));
      const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const orderData = {
        _id:nanoid(),
        userId:_id,
        orderNo:OrderNumber,
        amount:totalPrice,
        products:cart,
        date:formattedDate,
      };
      const order = new Order(orderData);
      await order.save();
      newCart.map((item)=>{
        Products.findOneAndUpdate({ _id: item._id }, { quantity: item.quantity }).exec();
        return item;
      })
      res.status(200).json({ message: "Order placed successfully!", order });
    } else {
      res.status(400).json({ error: "Empty cart. Please add items to your cart before placing an order." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const getOrders=async (req,res)=>{
  try{
    console.log("In request");
    let orders=[];
  const {skip,limit}=req.body;
  const decodedToken=req.user;
  orders=await Order.find({userId:decodedToken._id}).sort({createdAt:-1}).skip(skip).limit(limit).exec();
  orders=orders.map((item)=>{
    return {...item._doc,userName:decodedToken.name};
  })
  console.log(orders);
  const count=await Order.countDocuments({userId:decodedToken._id});
  res.status(200).json({"orders":orders,"count":count});
  }
  catch(error){
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}

export const getTotalAmount = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    if (result.length > 0) {
      return result[0].totalAmount;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error calculating total amount:", error);
    return 0;
  }
};


export const getTotalNumberOfProducts = async () => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: { $size: "$products" } },
        },
      },
    ]);
    if (result.length > 0) {
      return result[0].totalProducts;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error calculating total number of products:", error);
    return 0;
  }
};