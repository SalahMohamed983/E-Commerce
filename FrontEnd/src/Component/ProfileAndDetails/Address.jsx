import { Drawer, Button, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AddAddress, fetchAddress, UpdateAddress } from '../../Featured/AddressSlice';
import { CityData } from '../../Featured/CitySlice';

export default function Address({ open, address = null, onClose }) {
  const userData = useSelector((state) => state.Users.User || null);
  const dispatch = useDispatch();
  const Cities = useSelector((state) => state.Cities.City || null);

  const [formData, setFormData] = useState({
    id: 0,
    phoneNum: "",
    cityId: 0,
    street: "",
    userId: userData?.id,
    addressType: null
  });

  useEffect(() => {
    if (address) {
      setFormData({
        id: address.id,
        phoneNum: address.phoneNum,
        cityId: address.cityId,
        street: address.street,
        userId: userData?.id,
        addressType: address.addressType,
      });
    } else {
      setFormData({
        id: 0,
        phoneNum: "",
        cityId: 0,
        street: "",
        userId: userData?.id,
        addressType: null,
      });
    }

    dispatch(CityData());
  }, [address, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (address) {
        await dispatch(UpdateAddress(formData));
      } else {
        await dispatch(AddAddress(formData));
      }

      await dispatch(fetchAddress(userData?.id));

      setFormData({
        id: 0,
        phoneNum: "",
        cityId: 0,
        street: "",
        userId: userData?.id,
        addressType: null,
      });

      onClose();
    } catch (error) {
      console.error("Error while saving address:", error);
    }
  };
  return (
    <div className="p-5">
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div className="flex flex-col gap-y-6 w-[350px] md:w-[500px] p-5">
          <h2 className="text-lg font-semibold mb-4">
            {address ? "Edit Delivery Address" : "Add Delivery Address"}
          </h2>

          <TextField
            label="Street"
            name="street"
            fullWidth
            value={formData.street}
            onChange={handleChange}
          />

          <Select
            name="cityId"
            fullWidth
            value={formData.cityId}
            onChange={(e) =>
              setFormData({ ...formData, cityId: Number(e.target.value) })
            }
          >
            {Cities.map((ele) => (
              <MenuItem value={ele.id}>{ele.cityName}</MenuItem>
            ))}
            {/* <MenuItem value={2}>Alexandria</MenuItem>
            <MenuItem value={3}>Giza</MenuItem> */}
          </Select>

          <TextField
            label="Country"
            name="country"
            fullWidth
            value={"Egypt"}
            disabled
          />
          <TextField
            label="Phone"
            name="phoneNum"
            fullWidth
            value={formData.phoneNum}
            onChange={handleChange}
          />

          <div className="mt-3">
            <FormLabel>Address Type</FormLabel>
            <RadioGroup
              row
              name="addressType"
              value={formData.addressType}
              onChange={(e) =>
                setFormData({ ...formData, addressType: e.target.value === "true" })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Home" />
              <FormControlLabel value="false" control={<Radio />} label="Office" />
            </RadioGroup>
          </div>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#f44336", ":hover": { backgroundColor: "#d32f2f" } }}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
