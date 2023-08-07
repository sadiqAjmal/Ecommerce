import express from 'express';
import cloudinary from 'cloudinary'
import Products from '../models/products';
import multer from 'multer'
// import { verifyAdmin } from '../middlewares/verifyAdmin';
import { nanoid } from 'nanoid';
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const limit=req.query.limit;
    const skip=req.query.skip;
    const sortBy=req.query.sortBy;
    const find=req.query.find;
    const items = find?await Products.find({ name: {$regex:find,$options:'i'} }).sort(sortBy).skip(skip).limit(limit).exec():await Products.find({}).sort(sortBy).skip(skip).limit(limit).exec();
    const count=find?await Products.countDocuments({ name: {$regex:find,$options:'i'} }):await Products.countDocuments();
    res.json({products:items,count:count});
    } catch (error) {
    console.error('Error retrieving items:', error);
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

