import React, { useState, useEffect } from "react";
import { Col, Row, Container, Offcanvas, Image, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaUpload } from "react-icons/fa";
import ProductFormField from "../../product-form";
import AlertModal from "../../modal";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../loader";

function Action(props) {
  const token=useSelector((store)=>store.auth.token);
  const [reqPending,setReqPending]=useState(false);
  const [reqSuccess,setReqSuccess]=useState(false);
  const [alertText,setAlertText]=useState("");
  const [alertTitle,setAlertTitle]=useState("");
  const [showAlert,setShowAlert]=useState(false);
  const { item, isNewProduct } = props;
  const offcanvasStyle = {
    width: "60%",
  };
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  const saveImageToBackend = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/admin/upload-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adding the token to the headers
          },
        }
      );
  
      const imagePath = response.data.imageUrl;
      return imagePath;
    } catch (error) {
      console.log("Error saving image to backend:", error);
      return null;
    }
  };


  const updateProduct = async (formData,API_URL) => {
    try {
      setReqPending(true);
      const response = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReqPending(false);
      setReqSuccess(true);
      return response.data;
    } catch (error) {
      console.log("Error updating product:", error);
      throw error;
    }
  };
  
  
  const handleUpload = async () => {
    setReqPending(true);
    if (selectedImage) {
      try {
        const imagePath = await saveImageToBackend(selectedImage);
        setReqPending(false);
        return imagePath;
      } catch (error) {
        console.log("Error handling image upload:", error);
        setReqPending(false);
        return null;
      }
    }
    setReqPending(false);
    return null;
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const image=await handleUpload();
    if(isNewProduct)
    {
      console.log({image:image,...formData});
      if(!image||!formData.price||!formData.name||!formData.quantity)
      {
        setShowAlert(true);
        setAlertText("Please fill the necessary fields");
        setAlertTitle("Error");
        return;
      }
      else
      {
        try{
        await updateProduct({...formData,image:image},"http://localhost:5000/v1/admin/add-product");
      setAlertText("Product Added Successfully");
      setAlertTitle("Success!");
        setShowAlert(true);  
      }
        catch(err){
          setAlertText("Error Adding the Product. Please Try Again");
      setAlertTitle("Error!");
        setShowAlert(true); 
        }
      }
    }
    else{
      const dataToSend=image?{id:item._id,...formData,image:image}:{id:item._id,...formData};
     console.log(dataToSend);
     try{
      await updateProduct(dataToSend,"http://localhost:5000/v1/admin/edit-product");
      setAlertText("Product Updated Successfully");
      setAlertTitle("Success!");
        setShowAlert(true);  
     }
     catch(error){
      setAlertText("Error Updating the Product. Please Try Again");
      setAlertTitle("Error!");
        setShowAlert(true); 
     }
    }
  };
  const handleUploadImage = () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
      imageInput.click();
    }
  };
  useEffect(() => {
    setFormData({
    });
    setSelectedImage(null);
    setPreviewImage(null);
  }, [props.show]);
  useEffect(()=>{
    if(reqSuccess)
    {
      props.handleClose();
      setReqSuccess(false);
    }
  },[reqSuccess])
  return (
    <>
    <AlertModal Title={alertTitle} Body={alertText} show={showAlert} onHide={()=>{setShowAlert(false)}}/>
      <Offcanvas show={props.show} onHide={props.handleClose} placement="end" style={offcanvasStyle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{isNewProduct ? "Add New Product" : "Edit Product"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid>
            <Row>
              <Col md={5}>
                {isNewProduct ? (
                  <Card className="text-center">
                  <Card.Body>
                    {previewImage ? (
                      <Image src={previewImage} rounded className="w-100" />
                    ) : (
                        <FaUpload size={120} />)}
                        <Button variant="primary" className="mt-3" onClick={handleUploadImage}>
                          Upload Image
                        </Button>
                        <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} />
                  </Card.Body>
                </Card>
              ) : (
                  <>
                    {previewImage?<Image src={previewImage} rounded className="w-100" />:<Image src={item.image} rounded className="w-100" />}
                    <Button variant="primary" className="mt-3" onClick={handleUploadImage}>
                    <FaEdit />
                        </Button>
                        <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} />
                  </>
                )}
              </Col>
              <Col md={7}>
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <ProductFormField
                      controlId="name"
                      label="Product Name"
                      defaultValue={item.name}
                      onChange={handleInputChange}
                    />
                    <ProductFormField
                controlId="description"
                label="Description"
                defaultValue={item.description}
                as="textarea"
                rows={4}
                onChange={handleInputChange}
              />
              <ProductFormField
                controlId="price"
                label="Price"
                defaultValue={item.price}
                type="number"
                onChange={handleInputChange}
              />
              <ProductFormField
                controlId="quantity"
                label="Quantity"
                defaultValue={item.quantity}
                type="number"
                onChange={handleInputChange}
              />
              <ProductFormField
                controlId="color"
                label="Color"
                defaultValue={item.color}
                onChange={handleInputChange}
              />
              <ProductFormField
                controlId="size"
                label="Size"
                defaultValue={item.size}
                onChange={handleInputChange}
              />
                    <div className="d-flex justify-content-end align-items-end mt-3">
                      <Button variant="primary" type="submit" onSubmit={()=>{handleSubmit()}}>
                        {reqPending?<Loader/>:isNewProduct ? "Add Product" : "Update"}
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Col>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Action;
