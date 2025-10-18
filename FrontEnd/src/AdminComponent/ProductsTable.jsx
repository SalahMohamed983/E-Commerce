import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProduct } from "../Featured/ProductSlice";
import { Link } from "react-router-dom";
import { IconButton, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductsTable() {
  const dispatch = useDispatch();

  // States
  const [page, setPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [category, setCategory] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Products from Redux
  const products = useSelector(
    (state) => state.Products.productsByCategory[category] || []
  );
  const totalCount = useSelector(
    (state) => state.Products.totalCount || products.length
  ); // total products count from API

  // Fetch products
  useEffect(() => {
    dispatch(
      
      fetchProduct({
        category: 1,
        brand: null,
        page: page + 1,
        productPerPage: productsPerPage,
        search: "",
      })
    );
  }, [page, productsPerPage, dispatch]);

  // Pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * productsPerPage - products.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...products].slice(
        page * productsPerPage,
        page * productsPerPage + productsPerPage
      ),
    [page, productsPerPage, products]
  );

  return (
    <>
    <div className=" p-3">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2 md:gap-0">
        <h3 className="text-xl font-bold">Products</h3>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-lg w-full md:w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value || "");
            dispatch(
              fetchProduct({
                category: null,
                brand: null,
                page: 1,
                productPerPage: productsPerPage,
                search: e.target.value,
              })
            );
            setCategory("search");
            setPage(0);
          }}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-5">
        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={category || ""}
            onChange={(e) => {
              dispatch(
                fetchProduct({
                  category: Number(e.target.value),
                  brand: null,
                  page: 1,
                  productPerPage: productsPerPage,
                  search: "",
                })
              );
              setCategory(Number(e.target.value));
              setPage(0);
            }}
          >
            <option value={1}>Fashion</option>
            <option value={2}>Electronics</option>
            <option value={3}>Bags</option>
            <option value={4}>Footwear</option>
            <option value={5}>Groceries</option>
            <option value={6}>Beauty</option>
            <option value={8}>Jewellery</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2"
            onChange={(e) => {
              dispatch(
                fetchProduct({
                  category: null,
                  brand: Number(e.target.value),
                  page: 1,
                  productPerPage: productsPerPage,
                  search: "",
                })
              );
              setCategory(`Brand-${e.target.value}`);
              setPage(0);
            }}
          >
            <option value={1}>Fashion Women</option>
            <option value={2}>Fashion Men</option>
            <option value={3}>Phone</option>
            <option value={4}>Laptop</option>
            <option value={15}>Watches</option>
            <option value={5}>Women Bags</option>
            <option value={6}>Men Bags</option>
            <option value={7}>Women Footwear</option>
            <option value={8}>Men Footwear</option>
            <option value={9}>Groceries</option>
            <option value={10}>Beauty</option>
            <option value={13}>Jewellery</option>
          </select>
        </div>
      </div>
    </div>

      {/* Table with horizontal scroll */}
      <div className=" bg-white shadow rounded-lg">
        <div className="w-[350px] sm:w-[600px] md:w-full overflow-auto">
          <table className="w-[1444px] text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Products</th>
                <th className="p-3">Category</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Price</th>
                <th className="p-3">Sales</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img loading="lazy"
                        className="w-12 h-12 object-contain"
                        src={row.images[0]?.imageUrl}
                        alt={row.name}
                      />
                      <Link to={`/card/${row.id}`}>
                        <p className="hover:underline text-primary">{row.name}</p>
                      </Link>
                    </div>
                  </td>
                  <td className="p-3">{row.description}</td>
                  <td className="p-3">{row.discount}%</td>
                  <td className="p-3">
                    {(row.price - (row.discount / 100) * row.price).toFixed(2)}
                  </td>
                  <td className="p-3">{row.totalSales}</td>
                  <td className="p-3">
                    <Rating value={row.stars} readOnly size="small" />
                  </td>
                  <td className="p-3">
                    <IconButton onClick={() => dispatch(deleteProduct(row.id))}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
              {emptyRows > 0 && (
                <tr>
                  <td colSpan={7} className="p-3 text-center text-gray-400">
                    No more rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-3 border-t gap-2 md:gap-0">
          <span className="text-sm text-gray-600">
            Page {page + 1} of {Math.ceil(totalCount / productsPerPage) || 1}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page >= Math.ceil(totalCount / productsPerPage) - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
            <select
              className="border rounded px-2 py-1"
              value={productsPerPage}
              onChange={(e) => {
                setProductsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>


    </>
  );
}
