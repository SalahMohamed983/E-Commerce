import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUsers, AddUsers, addUser } from "../../Featured/UserSlice";
import { useNavigate, Link} from "react-router-dom";


export default function Register({ Log = false }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.Users.User || null);
  const isLoading = useSelector((state) => state.Users.isLoading);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const [actionType, setActionType] = useState(null); 
    
    const handleSubmit = (e) => {
      e.preventDefault();

  if (!Log) {
    setActionType("register");
    dispatch(AddUsers(form)); // Register
  } else {
    setActionType("login");
    dispatch(fetchLoginUsers({ email: form.email, password: form.password })); // Login
 
  }
  
}

useEffect(() => {
  if (!userData) return;
  
  if (actionType === "register") {
    nav("/login"); // بعد التسجيل
  } else if (actionType === "login") {
    if(form.password == "Admin" && form.email == "Admin@gmail.com")
     nav("/admin/");
else
    nav("/"); // بعد اللوجين
    dispatch(addUser(userData));
  }
}, [userData, actionType, nav, dispatch]);


return (
    <div className="bg-[#faf5f5] py-10 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 flex flex-col gap-7"
      >
        {!Log ? (
          <>
            <h2 className="text-xl font-semibold text-center">
              Register with a new account
            </h2>
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullName"
              fullWidth
              value={form.fullName}
              onChange={handleChange}
            />
          </>
        ) : (
          <h2 className="text-xl font-semibold text-center">
            Login with Your account
          </h2>
        )}

        <TextField
          label="Email Id"
          variant="outlined"
          name="email"
          type="email"
          fullWidth
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={form.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="error"
          fullWidth
          disabled={isLoading}
          className="hover:!bg-black !px-16 transition-all !duration-100 !font-semibold !bg-secondary !text-white"
        >
          {!Log ? "REGISTER" : "LOGIN"}
        </Button>

        <div>
          <p className="text-center text-sm text-gray-600">
            {!Log ? (
              <>
                Already have an account?{" "}
                <Link to="/login" className="text-secondary font-medium">
                  Login
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <Link to="/register" className="text-secondary font-medium">
                  Register
                </Link>
              </>
            )}
          </p>

          <Divider className="!mt-2 !mb-5">
            or continue with social account
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            className="hover:!bg-black transition-all !duration-100 !font-semibold hover:!text-white hover:!border-black !border-secondary !text-secondary"
          >
            SIGN UP WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
}