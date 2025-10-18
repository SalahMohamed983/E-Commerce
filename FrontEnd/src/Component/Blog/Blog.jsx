import { Link } from "react-router-dom";

export default function Blog()
{


  const arr = [{
    id: 1,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758993155_6-4.jpg",
  },
{
  id: 2,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758867669_7-6.jpg",
  },
{
  id: 3,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1742439558879_4-4.jpg",
  },
{
  id: 4,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758993155_6-4.jpg",
  }]



    return(
<div className="overflow-x-auto hide-scrollbar w-full flex gap-6">
  {arr.map((ele) => (
    <div
      key={ele.id}
      className="rounded-xl w-full sm:w-1/2 lg:w-1/4 flex-shrink-0"
    >
      {/* الصورة */}
      <div className="cursor-pointer rounded-t-xl mb-5 overflow-hidden">
        <img loading="lazy"
          src={ele.img}
          alt={ele.name}
          className="transition duration-300 hover:scale-[1.06] hover:rotate-2 w-full"
        />
      </div>

      {/* العنوان */}
      <Link to={`/BlogDetails/${ele.id}`}>
        <h2 className="text-[18px] hoverSec font-[500] leading-6 text-black mb-1 lg:mb-3">
          {ele.name}
        </h2>
      </Link>

      {/* الوصف */}
      <div className="mb-3 text-[14px] lg:text-[16px]">
        {ele.description}
      </div>

      {/* رابط قراءة المزيد */}
      <Link
        to={`/BlogDetails/${ele.id}`}
        className="font-[500] text-[14px] flex items-center gap-1 hoverSec"
      >
        Read More
      </Link>
    </div>
  ))}
</div>    );
}