import { Link } from "react-router-dom";

export default function  Section()
{
   const data = [{name:"Fashion", img:"/images/1752711374918_1000013786.png"},{name:"Electronics", img:"/images/1741660988059_ele.png"},
        {name:"Bags", img:"/images/1741661045887_bag.png"},{name: "Footer", img:"/images/1741661061379_foot.png"},{name:"Groceries", img: "/images/1741661077633_gro.png"}
        ,{name: "Beauty", img: "/images/1741661105893_well.png"}, {name:"Jewellery", img: "/images/1741661092792_beauty.png"}];
    return(
        <div className=" mt-10 container  mx-auto px-2 w-full md:space-x-0 space-x-2 overflow-auto hide-scrollbar xl:px-[30px] flex justify-between items-center">
       {data.map((ele, idx) => ( <Link to={ `/ShowProducts/${idx != 6?idx + 1: 8}`}>
     <div className=" hoverTatra w-[120px] h-[100px] md:w-[200px] md:h-[160px] font-[500] rounded-xl bg-white flex flex-col justify-center items-center ">
        <img loading="lazy"  className=" w-[40px] md:w-[60px] pb-3" src={ele.img} alt=""/>
       <p className=" text-sm md:text-lg">{ele.name}</p>
     </div></Link>
     ))}
        </div>
    );
}