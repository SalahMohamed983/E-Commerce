import { HomeOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { Badge, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoritProduct } from "../../Featured/FavoritProducts";
import { Link, useLocation } from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterMobile from "./FilterMobile";

export default function NavBarInMbomile() {
  const [alignment, setAlignment] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const userData = useSelector((state) => state.Users.User || null);
  const FavoritProduct = useSelector(
    (state) => state.FavoritProducts.Favoritproduct || []
  );

  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchFavoritProduct(userData.id));
    }
  }, [dispatch, userData]);

  // sync alignment with current route
  useEffect(() => {
  
    if (location.pathname.startsWith("/ShowProducts")) {
    setFilter(true);
 setAlignment(6);
  } else {
    setFilter(false);
  }
    switch (location.pathname) {
      case "/":
        setAlignment(1);
        break;
      case "/SearchInput":
        setAlignment(2);
        break;
      case "/ProfileAndDashboardNamePagedMobile":
      setAlignment(3);
        break;
      case "/ProfileAndDashboardMobile":
        setAlignment(4);
        break;
      case "/ProfileAndDashboard":
        setAlignment(5);
        break;
      default:
        setAlignment(null);
    }
  }, [location.pathname]);

  const getButtonClass = (value) =>
    `!flex-col  ${filter? "!px-1" :"!px-2"} sm:!px-2 !items-center !flex !border-none !py-3 !bg-transparent
     ${alignment === value ? "!text-secondary" : "text-gray-600"}`;

      const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={`bottom-0 fixed z-[1000]   w-full bg-white md:hidden flex justify-center items-center`}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={(e, newAlignment) => setAlignment(newAlignment)}
        aria-label="Navigation"
      >
        <Link to="/">
          <ToggleButton value={1} className={getButtonClass(1)}>
            <HomeOutlined className="!size-[30px]" />
            <p>Home</p>
          </ToggleButton>
        </Link>

        <Link to="/SearchInput">
          <ToggleButton value={2} className={getButtonClass(2)}>
            <SearchIcon className="!size-[30px]" />
            <p>Search</p>
          </ToggleButton>
        </Link>
 { filter && <ToggleButton onClick={toggleDrawer("bottom", true)} value={6} className={getButtonClass(6)}>
            <FilterAltIcon className="!size-[30px]"/>
            <p>Filter</p>
          </ToggleButton>}
        <Link to="/ProfileAndDashboardNamePagedMobile">
          <ToggleButton value={3} className={getButtonClass(3)}>
            <Badge
              badgeContent={FavoritProduct.length || 0}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ff5252",
                  color: "white",
                },
              }}
            >
              <FavoriteBorderIcon className="!size-[30px]" />
            </Badge>
            <p>Wishlist</p>
          </ToggleButton>
        </Link>

        <Link to="/ProfileAndDashboardMobile">
          <ToggleButton value={4} className={getButtonClass(4)}>
            <LocalMallOutlinedIcon className="!size-[30px]" />
            <p>Orders</p>
          </ToggleButton>
        </Link>

        <Link to="/ProfileAndDashboard">
          <ToggleButton value={5} className={getButtonClass(5)}>
            <PermIdentityIcon className="!size-[30px]" />
            <p>Account</p>
          </ToggleButton>
        </Link>
      </ToggleButtonGroup>
      <FilterMobile state={state} toggleDrawer={toggleDrawer} />
    </div>
  );
}
