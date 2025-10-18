import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { TotalNumsData } from "../Featured/TotalNumSlice";
import ProductsTable from "./ProductsTable";
import DrawerAddProduct from "./DrawerAddProduct";


export default function Dashboard() {
  const [drawerAddOpen, setDrawerAddOpen] = React.useState(false); // Drawer إضافة منتج
  const dispatch = useDispatch();
  const TotalNum = useSelector((state) => state.TotalNums.Num);

  React.useEffect(() => {
    dispatch(TotalNumsData());
  }, []);

  const stats = [
    { title: "Total Users", value: TotalNum.totalOfUsers, color: "bg-green-500" },
    { title: "Total Orders", value: TotalNum.totalOfOrders, color: "bg-blue-500" },
    { title: "Total Products", value: TotalNum.totalOfProducts, color: "bg-indigo-500" },
    { title: "Total Category", value: TotalNum.totalOfCategories, color: "bg-red-500" },
  ];

  return (
    <>
    <Box className=" !mb-12" sx={{ display: "flex" }}>
      <CssBaseline />

      <MuiAppBar position="fixed" className="!w-full !bg-white">
        <Toolbar>
          <Typography variant="h6" className="!text-primary" noWrap component="div">
            ClassyShop Admin
          </Typography>
        </Toolbar>
      </MuiAppBar>

      <div className="!w-full">
        <div className="p-6 mt-10 bg-gray-100">
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow">
            <div>
              <h2 className="text-2xl font-bold">
                Welcome, <span className="text-blue-600">Admin</span>
              </h2>
              <p className="text-gray-500">Here’s what happening on your store today.</p>
            </div>
            <Button variant="contained" color="primary" onClick={() => setDrawerAddOpen(true)}>
              + Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {stats.map((s, i) => (
              <div key={i} className={`${s.color} text-white p-5 rounded-xl shadow`}>
                <Typography variant="h6">{s.title}</Typography>
                <Typography variant="h4" className="font-bold">{s.value}</Typography>
              </div>
            ))}
          </div>

          {/* Products Table */}
          <div className="mt-8 bg-white rounded-xl shadow md:p-5">
            <ProductsTable />
          </div>
        </div>

        {/* Drawer Add Product */}
      </div>
    </Box>
        <DrawerAddProduct open={drawerAddOpen} onClose={() => setDrawerAddOpen(false)} />
  </>
      );
}
