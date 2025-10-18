import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PopularProductSwipper from './PopularProductSwipper';

export default function PopularProduct() {
  const [alignment, setAlignment] = React.useState(1);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };


  const getButtonClass = (value) =>
    `!bg-transparent !border-none relative px-4 py-2 text-sm font-medium transition-all duration-100
     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary
     after:transition-all after:duration-100
     ${alignment === value ? '!text-secondary after:w-full' : 'text-gray-600 after:w-0'}`;

  return (
    <div>
<PopularProductSwipper  category={alignment}>
      <div className=" flex flex-col  md:flex-row items-start justify-between md:items-center">
        <div>
          <h2 className="text-xl font-bold">Popular Products</h2>
          <p className="text-sm text-gray-500 md:pb-0 pb-4">Do not miss the current offers until the end of March.</p>
        </div>

<div className=' w-full md:w-fit overflow-auto hide-scrollbar'>

        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={1} className={getButtonClass(1)}>
        Fashion
                 </ToggleButton>
          <ToggleButton value={2} className={getButtonClass(2)}>
            Electronics
          </ToggleButton>
<ToggleButton value={3} className={getButtonClass(3)}>
Bags
                     </ToggleButton>
<ToggleButton value={4} className={getButtonClass(4)}>
Footwear
                     </ToggleButton>
<ToggleButton value={5} className={getButtonClass(5)}>
           Groceries
                     </ToggleButton>

          <ToggleButton value={6} className={getButtonClass(6)}>
            Beauty
          </ToggleButton>
          <ToggleButton value={8} className={getButtonClass(8)}>
            Jewellery
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
</div>

</PopularProductSwipper>


    </div>
  );
}