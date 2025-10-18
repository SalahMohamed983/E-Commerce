import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import Home from "./Component/Home/Home";

import DrawerAddProduct from "./AdminComponent/DrawerAddProduct";
import Dashboard from "./AdminComponent/Dashboard";

import "./css/App.css";
import CartProductDetails from "./Component/CartProduct/CartProductDetails";
import CardDetails from "./Component/Product/CardDetails";
import Register from "./Component/Login/Register";
import BlogDetails from "./Component/Blog/BlogDetails";
import MainHeader from "./Component/Header/MainHeader";
import ProfileAndDashboard from "./Component/ProfileAndDetails/ProfileAndDashboard";
import ShowProducts from "./Component/Product/ShowProducts";
import Checkout from "./Component/CartProduct/Checkout";
import NavBarInMomile from "./Component/Header/NavBarInMombile";
import SearchInput from "./Component/Header/SearchInput";
import { useEffect } from "react";
import { ToastProvider } from "./Component/ExtraComponent/ToastContext";

function ClientLayout({ children }) {
  return (
    <div className="text-primary">
      <MainHeader />
      {children}
      <Footer />
      <NavBarInMomile />
    </div>
  );
}

function AdminLayout({ children }) {
  return <div className="admin-layout">{children}</div>;
}
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
				<ToastProvider>
     <ScrollToTop />
      <Routes>
        {/* ---------------- Client Routes ---------------- */}
        <Route
          path="/*"
          element={
            <ClientLayout>
              <Routes>
                <Route path="/Footer" element={<></>} />
                <Route path="/Checkout" element={<Checkout />} />
                <Route path="/" element={<Home />} />
                <Route path="/card/:id" element={<CardDetails />} />
                <Route
                  path="/ShowProducts/:category"
                  element={<ShowProducts brand={false} />}
                />
                <Route
                  path="/ShowProductsBrand/:category"
                  element={<ShowProducts brand={true} />}
                />
                <Route path="/ShowProducts" element={<ShowProducts />} />
                <Route
                  path="/CartProductDetails"
                  element={<CartProductDetails />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Register Log={true} />} />
                <Route path="/BlogDetails/:id" element={<BlogDetails />} />
                <Route
                  path="/ProfileAndDashboard"
                  element={<ProfileAndDashboard />}
                />
                <Route
                  path="/ProfileAndDashboardMobile"
                  element={
                    <ProfileAndDashboard
                      PageName="orders"
                      IsMobile="OrderMobile"
                    />
                  }
                />
                <Route
                  path="/ProfileAndDashboardNamePage"
                  element={<ProfileAndDashboard PageName="list" />}
                />
                <Route
                  path="/ProfileAndDashboardNamePagedMobile"
                  element={
                    <ProfileAndDashboard
                      PageName="list"
                      IsMobile="FavoritMobile"
                    />
                  }
                />
                <Route path="/SearchInput" element={<SearchInput />} />
              </Routes>
            </ClientLayout>
          }
        />

        {/* ---------------- Admin Routes ---------------- */}
        <Route
           path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/drawer" element={<DrawerAddProduct />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
				</ToastProvider>
    </div>
  );
}

export default App;
