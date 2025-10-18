import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from '../../Featured/AddressSlice';
import Address from './Address';
// import AddressCard from './AddressCard';
import { Menu, MenuItem, IconButton, Paper, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteAddress } from '../../Featured/AddressSlice';

  const AddressCard = ({ prop, fullName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  function handleDelete() {
    dispatch(DeleteAddress(prop.id));
    handleClose();
  }

  function handleUpdate() {
    
    setCartOpen(true);
    handleClose();
  }

  return (
    <>
      <Paper className="p-4 !bg-gray-50 flex justify-between items-start mb-4" elevation={1}>
        <div>
          <Chip label={prop?.addressType ? "Home" : "Office"} size="small" className="mb-2" />
          <h2 className="font-bold">{fullName}</h2>
          <p className="text-sm text-gray-700">{prop?.phoneNum}</p>
          <p className="text-sm text-gray-500">{prop?.street}</p>
        </div>
        <div>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleUpdate} className="w-[120px]">Edit</MenuItem>
            <MenuItem onClick={handleDelete} className="w-[120px]">Delete</MenuItem>
          </Menu>
        </div>
      </Paper>

      <Address open={cartOpen} address={prop} onClose={() => setCartOpen(false)} />
    </>
  );
};

// export {AddressCard};


const AddressDetails = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchAddress(Number(userData?.id)));
    }
  }, [dispatch, userData]);

  const Addresses = useSelector((state) => state.Addresses.Address || []);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="mx-auto bg-white p-6">
      <h1 className="text-xl font-semibold mb-4">Address</h1>

      <Address open={cartOpen} onClose={() => setCartOpen(false)} />

      <Button
        variant="outlined"
        onClick={() => setCartOpen(true)}
        fullWidth
        className="!mb-6 !py-3 hover:!bg-black !font-semibold hover:!text-white hover:!border-black !border-secondary !text-secondary"
      >
        Add Address
      </Button>

      {Addresses.length > 0 &&
        Addresses.map((addr) => (
          <AddressCard key={addr.id} prop={addr} fullName={userData?.fullName} />
        ))}
    </div>
  );
};

export default AddressDetails;
