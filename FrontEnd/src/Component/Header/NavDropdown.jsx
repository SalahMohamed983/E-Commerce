import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavDropdown({ Name, arr= [], num }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
     <Link to={`/ShowProducts/${num}`}> <h3 className="hoverSec text-[16px] font-[500] inline-flex items-center gap-1">
        {Name}
      </h3></Link>

      <div
        className={`absolute z-[2000]  w-40  bg-white border border-gray-200 rounded-md shadow-md transition-all duration-200 origin-top transform
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
      >
        {arr.map((ele) => 
        
          <Link to={`/ShowProductsBrand/${ele.id}`} key={ele.id}>
          <span key={ele.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">{ele.name}</span>
         </Link>
        )}
       
      </div>
    </div>
  );
}

export default NavDropdown;