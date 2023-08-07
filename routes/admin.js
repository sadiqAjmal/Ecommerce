import express from 'express';
import { getTotalAmount,getTotalNumberOfProducts } from '../controllers/orders';
const router = express.Router();
import cloudinary from 'cloudinary'
import Products from '../models/products';
import multer from 'multer'
import { nanoid } from 'nanoid';
import Order from '../models/orders';
import User from '../models/user';
router.post('/get-orders', async (req, res) => {
    try {
      console.log("/adminOrders");
      const { skip, limit } = req.body;
      let orders = await Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
      orders = await Promise.all(
        orders.map(async (item) => {
          const user = await User.findOne({ _id: item.userId });
          return { ...item._doc, userName: user.name };
        })
      );
      const count = await Order.countDocuments();
      res.send({ orders: orders, count: count });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  });
  router.post('/getOrdersDetail',async(req,res)=>{
    try{
      const TotalEarnings=await getTotalAmount();
      const count= await Order.countDocuments();
      const TotalProducts=await getTotalNumberOfProducts();
      res.send({total:TotalEarnings,count:count,totalProducts:TotalProducts});
    }
    catch(err)
    {
      console.log(err);
      res.status(400).json({error:err});
    }
  })
  router.post('/search-order', async (req, res) => {
    try {
      console.log("/search");
      const { toSearch, skip, limit } = req.body;
      console.log(toSearch);
      const users = await User.find({ name: { $regex: toSearch, $options: 'i' } });
      const userIds = users.map((user) => user._id);
      const foundItems = await Order.find({
        $or: [
          { orderNo: { $regex: toSearch, $options: 'i' } },
          { userId: { $in: userIds } },
        ],
      })
        .populate('userId', 'name')
        .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .exec();
      const count = await Order.countDocuments({
        $or: [
          { orderNo: { $regex: toSearch, $options: 'i' } },
          { userId: { $in: userIds } },
        ],
      });
      const foundItemsWithUserName = await Promise.all(foundItems.map((item) => ({
        ...item._doc,
        userName: item.userId.name,
      })));
      console.log(count);
      res.send({ foundItems: foundItemsWithUserName, count: count });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

cloudinary.config({
  cloud_name: "dckrku6uw",
  api_key: "579525856853398",
  api_secret: "C1pCdndn351BgyYYv03UoyRui8s",
});
const upload = multer({ storage: multer.memoryStorage() });
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      throw "No image provided";
    }

    const base64Image = req.file.buffer.toString('base64'); // Convert Buffer to Base64

    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
      folder: "images",
      resource_type: "auto",
    });

    const imageUrl = result.secure_url;
    console.log(imageUrl);

    res.json({imageUrl});
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});


router.put("/edit-product", async (req, res) => {
  try {
    const { name, image, description, quantity, price, color, size, id } = req.body;
    const updatedProduct = {};
    if (name) updatedProduct.name = name;
    if (image) updatedProduct.image = image;
    if (description) updatedProduct.description = description;
    if (quantity) updatedProduct.quantity = quantity;
    if (price) updatedProduct.price = price;
    if (color) updatedProduct.color = color;
    if (size) updatedProduct.size = size;
    const prod = await Products.findOneAndUpdate({ _id: id }, updatedProduct, { new: true });
    if (!prod) {
      throw "Product not found";
    }
    res.json(prod);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/delete-product",async (req, res) => {
  try {

    const {id } = req.body;
    console.log(id);
    const prod = await Products.findOneAndDelete({ _id: id });
    if (!prod) {
      throw "Product not found";
    }
    res.send("Deleted Successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put("/add-product",  async (req, res) => {
  try {
    const  formData = req.body;
    const id=nanoid();
    const product=new Products({...formData,_id:id});
    product.save();
    res.send("Added Successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;