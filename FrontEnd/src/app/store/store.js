import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../../Featured/ProductSlice"
import ReviewSlice from "../../Featured/ReviewRatingSlice"
import CartProductSlice from "../../Featured/CartSlice"
import UserSlice from "../../Featured/UserSlice"
import FavoritProductSlice from "../../Featured/FavoritProducts"
import AddressSlice from "../../Featured/AddressSlice"
import OrderSlice from "../../Featured/OrderSlice"
import TotalNumSlice from "../../Featured/TotalNumSlice"
import CitySlice from "../../Featured/CitySlice"

export default configureStore({
	reducer: {
		Products: ProductSlice,
		ReviewsRatings: ReviewSlice,
		CartProducts: CartProductSlice,
		Users: UserSlice,
		FavoritProducts: FavoritProductSlice,
		Addresses: AddressSlice,
		Orders: OrderSlice,
	TotalNums: TotalNumSlice,
	Cities: CitySlice,
	}
});
