import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Rating,
  Switch,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useDispatch} from "react-redux";
import { AddProducts } from "../Featured/ProductSlice";

export default function AddProduct({ onClose }) {
  // const [rating, setRating] = useState(2);
const [images, setImages] = useState([]);

const handleImageChange = (e) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]); // ضيف كل الملفات
  }
};
const dispatch = useDispatch();

const [form, setForm] = useState(
{   name: "",
 description: "",
 price:0,
 quntity: 0,
 stars: 0,
 isAvaliable: null,
 brandId: null,
 discount: null,
});
function HandleAddProduct() {
  dispatch(AddProducts({ body: form, images })); // بعت كل الصور
}


 


  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-lg rounded-2xl w-full">
        <CardContent className="relative">
          <IconButton
            className="absolute top-3 left-3 text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className="mb-6 font-bold text-center">
            Add Product
          </Typography>

          <div className="mb-4">
         <TextField
  label="Product Name"
  fullWidth
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
          </div>

          <div className="mb-4">
            <TextField
              label="Product Description"
              fullWidth
              multiline
              rows={3}
              className="bg-white rounded-lg"
              value={form.description}
             onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <TextField  select label="Product Category" fullWidth>
              <MenuItem value={1}>Fashion</MenuItem>
              <MenuItem value={2}>Electronics</MenuItem>
              <MenuItem value={3}>Bags</MenuItem>
              <MenuItem value={4}>Footwear</MenuItem>
              <MenuItem value={5}>Groceries</MenuItem>
              <MenuItem value={6}>Beauty</MenuItem>
              <MenuItem value={8}>Jewellery</MenuItem> 
                         </TextField>
            <TextField
              value={form.brandId}
             onChange={(e) => setForm({...form, brandId: e.target.value})} select label="Product Brand" fullWidth>
              <MenuItem value={1}>Fashion Women</MenuItem>
              <MenuItem value={2}>Fashion Men</MenuItem>
              <MenuItem value={3}>Phone</MenuItem>
              <MenuItem value={4}>LapTop</MenuItem>
              <MenuItem value={15}>Watches</MenuItem>
              <MenuItem value={5}>Women Bags</MenuItem>
              <MenuItem value={6}>Men Bags</MenuItem>
              <MenuItem value={7}>Women Footwear</MenuItem>
              <MenuItem value={8}>Men Footwear</MenuItem>
              <MenuItem value={9}>Groceries</MenuItem>
              <MenuItem value={10}>Beauty</MenuItem>
              <MenuItem value={13}>Jewellery</MenuItem>
            </TextField>
          <TextField
  label="Product Price"
  fullWidth
  type="number"
  value={form.price}
  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextField  value={form.isAvaliable}
             onChange={(e) => setForm({...form, isAvaliable: e.target.value})} select label="Is Avalible?" fullWidth>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </TextField>
            <TextField value={form.quntity}
             onChange={(e) => setForm({...form, quntity: Number(e.target.value)})}  label="Product Stock" fullWidth />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <TextField  label="Product Discount" fullWidth value={form.discount}
             onChange={(e) => setForm({...form, discount: Number(e.target.value)})} />
          </div>

          <div className="mb-4">
            <Typography className="font-semibold mb-1">
              Product Rating
            </Typography>
            <Rating
            
              value={form.stars}
              onChange={(e, newValue) => setForm({...form, stars: newValue})}
            />
          </div>

          <div className="mb-4">
            <Typography className="font-semibold mb-1">
              Media & Images
            </Typography>

            <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {images.map((img, index) => (
  <img loading="lazy"
    key={index}
    src={URL.createObjectURL(img)}
    alt={`preview-${index}`}
    className="mx-auto max-h-32 object-contain border rounded-lg"
  />
))}

              <Box className="border-dashed border-2 border-gray-300 p-6 text-center rounded-xl relative">
<input
  type="file"
  accept="image/*"
  multiple  
  className="absolute inset-0 opacity-0 cursor-pointer"
  onChange={handleImageChange}
/>                <CloudUploadIcon fontSize="large" />
                <Typography>Upload</Typography>
              </Box>
            </Box>
          </div>



          <Button
            variant="contained"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            startIcon={<CloudUploadIcon />}
          onClick={HandleAddProduct}
          >
            Publish and View
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
