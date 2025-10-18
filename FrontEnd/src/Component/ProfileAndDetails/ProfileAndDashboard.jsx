import React, { useState } from "react";
import { Button, TextField, Avatar, Rating, Typography } from "@mui/material";
import OrderTable from "./OrderTable";
import MyFavoritList from "./MyFavoritList";
import Address from "./Address";
import AddressDetails from "./AddressDetails";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Collapse from "@mui/material/Collapse";
import { useDispatch, useSelector} from "react-redux";
import { ChangeUser, removeUser, UpdateUsers } from "../../Featured/UserSlice";
import { useNavigate } from "react-router-dom";
import ButtonBase from '@mui/material/ButtonBase';
import { Login } from "@mui/icons-material";
import Register from "../Login/Register";



const ProfileAndDashboard = ({PageName = "profile", IsMobile = "AccountMobile"}) => {
  const [activePage, setActivePage] = useState(PageName);
  
  const nav = useNavigate();

  const userData = useSelector((state) => state.Users.User || null);
  
  let user = false;
  if(userData != false || userData != true || userData != null)
    user = userData; 
  else
    user = false; 
  
  const [form, setForm] = useState({
    id: userData?.id,
    fullName: user?.fullName,
    password: userData?.password,
    email: userData?.email,
    avterImage: null
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setForm({...form, avterImage: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const [confirmPassword, setConfirmPasswordForm] = useState("");

  const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    if(activePage == "logout")
    {
      dispatch(removeUser());
      nav("/");
    }

  async function HandleUpdate()
   {
await dispatch(UpdateUsers(form));
await dispatch(ChangeUser(form));
   }
  
  return (
    userData? (

      <div className=" flex flex-col md:flex-row gap-y-6 items-start container mx-auto xl:px-[30px] py-[40px] bg-[#faf5f5] p-6">
      {/* Sidebar */}
      <div className={`${IsMobile == "FavoritMobile" || IsMobile == "OrderMobile"? "hidden": "md:sticky md:top-[160px] w-full md:w-72 py-5 bg-white rounded-lg shadow"}`}>

        <div className="flex flex-col items-center mb-6 ">
          <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
           sx={{
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar className=" !size-[80px]"
 alt="Upload new avatar" src={form.avterImage} />
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
    </ButtonBase>
    
          <h2 className="mt-2 font-semibold">{user?.fullName}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        
        <ul className=" space-y-2">
          {[
            { key: "profile", label: "My Profile", com:<PersonOutlineOutlinedIcon /> },
            { key: "address", label: "Address", com: <LocationOnOutlinedIcon/> },
            { key: "list", label: "My List" , com: <FavoriteBorderOutlinedIcon />},
            { key: "orders", label: "My Orders" , com: <LocalMallOutlinedIcon />},
            { key: "logout", label: "Logout" , com : <ExitToAppOutlinedIcon />},
          ].map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
              }}
              className={`flex items-center gap-2 p-2 pl-4 cursor-pointer hover:bg-gray-100 ${
                activePage === item.key ? "bg-red-50 border-l-4 border-red-500" : ""
              }`}
            >
              {item.com}
              {item.label}
            </li>
          ))}
        </ul>
            </div>
 
      {/* Content */}
      <div className="md:ml-6 w-full md:w-[60%]">
        {activePage === "profile" && (
          <>
                     <div className=" mb-4 bg-white rounded-lg shadow p-6 pt-4">
            <div className=" flex items-center  justify-between">
            <h2 className="text-xl font-semibold ">My Profile</h2>
            <Button variant="text"   onClick={() => setOpen(!open)}>Change Password</Button>
              </div>
            <hr className=" text-tertiary mt-2 mb-8" />
            <form className="flex flex-col  !space-y-6 ">
              <div className="flex md:flex-row flex-col  justify-between items-center gap-4">
              <TextField label="Full Name" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} fullWidth  />
              <TextField disabled={true} label="Email" fullWidth value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <Button onClick={() => {
              HandleUpdate(); 
            }} variant="contained" className="!w-[200px] !bg-secondary" color="error">
                Update Profile
              </Button>
            </form>
          </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="mt-3 border border-gray-200 rounded-lg p-4 bg-white">
           <Typography component="span" >Change Password</Typography>
          <hr className=" text-tertiary mt-3 mb-8" />
          <form className="flex flex-col !space-y-6">
            <div className="flex justify-between md:flex-row flex-col items-center gap-4">
              <TextField label="New Password" fullWidth onChange={(e) => setForm({...form, password: e.target.value})} />
              <TextField label="Confirm Password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPasswordForm(e.target.value)}/>
            </div>
            <Button onClick={() => {
             confirmPassword == form.password&& HandleUpdate(); 
            }} variant="contained" className="!w-[200px] !bg-secondary " color="error">
              Change Password
            </Button>
          </form>
        </div>
      </Collapse>
          </>
        )}

        {activePage === "list" && (
          <div className=" mb-4 bg-white rounded-lg shadow  md:p-6 pt-4">
          <MyFavoritList />
          </div>
        )} 
        {activePage === "address" && (
          
          // <div className=" mb-4 bg-white rounded-lg shadow p-6 pt-4">
          <AddressDetails />
          //  </div>
          )} 

          {activePage === "orders" && (
          <div className=" mb-4 bg-white rounded-lg shadow md:p-6 pt-4">
<OrderTable />
        </div>
        )}
       {/* نفس مكان الـ Accordion القديم */}

      </div>
    </div>
    ): <Register  Log = {true } />
  );
};

export default ProfileAndDashboard;
