import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, setFilter } from "../../Featured/ProductSlice";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.Products.filter);
  const categoryPara = useSelector((state) => state.Products.categoryPara);

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

  return (
    <>
      {/* Categories */}
      <Accordion
        disableGutters
        square
        className="!w-full !rounded-none !shadow-none"
        sx={{ borderBottom: "1px solid #eee" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1-header">
          <Typography component="span">Categories</Typography>
        </AccordionSummary>
        <AccordionDetails className=" !py-0">
          {categories.map((cat, index) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  className=" !py-4 "
                  checked={filter.Category.includes(index + 1)}
                  onChange={() => {
                    const newSelected = filter.Category.includes(index + 1)
                      ? filter.Category.filter((c) => c !== index + 1)
                      : [...filter.Category, index + 1];

                    const updated = {
                      ...filter,
                      Category: newSelected,
                    };

                    dispatch(setFilter(updated));
                    dispatch(filterProduct({ body: updated, categoryPara }));
                  }}
                  sx={{
                    padding: "2px 6px",
                    "&.Mui-checked": { color: "#f43f5e" },
                  }}
                />
              }
              label={cat}
              sx={{ margin: 0 }}
            />
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Price */}
      <Typography variant="h6" className="!mt-6 mb-2 font-semibold">
        Filter By Price
      </Typography>
      <Slider
        value={[filter.MinPrice, filter.MaxPrice]}
        onChange={(e, newValue) => {
          const updated = {
            ...filter,
            MinPrice: newValue[0],
            MaxPrice: newValue[1],
            Category: categoryPara ? [categoryPara] : [],
          };
          dispatch(setFilter(updated));
          dispatch(filterProduct({ body: updated, categoryPara }));
        }}
        valueLabelDisplay="auto"
        min={0}
        max={2000}
        className="!text-secondary"
      />
      <div className="flex mt-2 mb-6 justify-between text-sm">
        <span>
          From: <strong>Rs: {filter.MinPrice}</strong>
        </span>
        <span>
          To: <strong>Rs: {filter.MaxPrice}</strong>
        </span>
      </div>

      {/* Rating */}
      <Typography variant="h6" className="!mt-6 !mb-2 font-semibold">
        Filter By Rating
      </Typography>
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="flex items-center">
          <Checkbox
            checked={filter.Star === star}
            onChange={() => {
              const newRating = filter.Star === star ? 0 : star;
              const updated = {
                ...filter,
                Star: newRating,
                Category: categoryPara ? [categoryPara] : [],
              };
              dispatch(setFilter(updated));
              dispatch(filterProduct({ body: updated, categoryPara }));
            }}
              sx={{
                    "&.Mui-checked": { color: "#f43f5e" },
                  }}
          />
          <Rating
            value={star}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": { color: "#ffc107" },
            }}
          />
        </div>
      ))}
    </>
  );
}
