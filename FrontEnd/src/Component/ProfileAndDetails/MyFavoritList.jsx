import { useEffect } from "react";
import ProductSummaryDetails from "../CartProduct/ProductSummaryDetails";
import {useDispatch, useSelector} from "react-redux";
import { fetchFavoritProduct } from "../../Featured/FavoritProducts";

 
 export default function MyFavoritList()
 {

    const dispatch = useDispatch();
  
     const userData = useSelector((state) => state.Users.User || null);


    useEffect(() => {
      
      dispatch(fetchFavoritProduct(userData?.id));
      
}, [dispatch, userData]);


const FavoritProduct = useSelector((state) => state.FavoritProducts.Favoritproduct || []);


 return(
     < >
      <h2 className="px-2 md:px-0 text-2xl font-semibold mb-2">Your Favorit List</h2>
      <p className="mb-6 text-gray-600 px-2 md:px-0">
        There are <span className="text-secondary font-bold">{FavoritProduct?.length}</span> products in your cart
      </p>

      <div>
        {/* Cart Items */}
  <div className="lg:col-span-2 space-y-4">
 {FavoritProduct?.length > 0? FavoritProduct?.map((item) => (
 <ProductSummaryDetails product={item} IsCart={false} />
)): "No Favorit Products"}
</div>
</div>
</>
)}