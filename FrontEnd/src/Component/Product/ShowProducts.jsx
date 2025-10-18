import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Rating,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, filterProduct, GetParaGategory, setFilter } from "../../Featured/ProductSlice";
import { useParams } from "react-router-dom";
import CardProduct from "./CardProduct";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import FilterSidebar from "./FilterSidbar";

  const categories = [
  "Fashion",
  "Electronics",
  "Bags",
  "Footwear",
  "Groceries",
  "Beauty",
  "Wellness",
  "Jewellery",
];

export default function ShowProducts({ brand = false }) {
  const { category } = useParams();
  const categoryPara = category ? parseInt(category) : null;


   const { productsByCategory, isLoading, filter } = useSelector(
    (state) => state.Products
  );
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(
      fetchProduct({
        category: brand ? null : categoryPara,
        page: 1,
        productPerPage: 100,
        search: "",
        brand: brand ? categoryPara : null,
      })
    );

    dispatch(GetParaGategory(categoryPara));
  }, [categoryPara, brand, dispatch]);


  let products = [];
  if (!categoryPara && productsByCategory["search"])
    products = productsByCategory["search"];
  else if (brand)
    products = productsByCategory[`Brand-${categoryPara}`] || [];
  else products = productsByCategory[categoryPara] || [];

  return (
    <div className="container mx-auto xl:px-[30px] my-[10px]">
      <div className="flex gap-2">
        <div className="w-[300px] !p-0 md:block hidden">
          <Typography variant="h6" className="mb-2 font-semibold">
            Shop by Category
          </Typography>
<FilterSidebar />
        </div>

        {/* Products Section */}
        <div className=" w-full p-4">
          <div className="flex justify-between items-center bg-gray-100 px-4 py-2 mb-4 rounded">
            <div className="flex items-center gap-2">
              <span>
                {products.length} products
                {categoryPara && ` in ${categories[categoryPara - 1]}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-sm text-gray-600">
                Sort By
              </span>
              <select
                onChange={(e) => {
                  const sortVal = parseInt(e.target.value);
                  const updated = {
                    ...filter,
                    SortProduct: sortVal,
                    Category: categoryPara ? [categoryPara] : [], // ✅ بس الحالي
                  };
                  dispatch(filterProduct({ body: updated, categoryPara }));
                  dispatch(setFilter(updated));
                 }}
                className="border rounded md:px-2 py-1 sm:text-sm text-[10px]"
              >
                <option value={1}>Name, A To Z</option>
                <option value={2}>Name, Z To A</option>
                <option value={3}>Price, Low to High</option>
                <option value={4}>Price, High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {!isLoading ? (
              products.length !== 0 ? (
                products.map((p) => (
                  <CardProduct key={p.id} product={p} border={true} />
                ))
              ) : (
                <div>No Products Found</div>
              )
            ) : (
              Array.from({ length: 20 }).map((_, i) => (
                <Box key={i} sx={{ pt: 0.5 }}>
                  <Skeleton
                    className="!rounded-xl"
                    variant="rectangular"
                    width="100%"
                    height={218}
                  />
                  <Skeleton width="80%" />
                  <Skeleton width="30%" />
                  <Skeleton width="60%" />
                  <Skeleton width="90%" height={50} />
                </Box>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
