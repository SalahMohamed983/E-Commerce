import { Link } from "react-router-dom";

export default function TopHeader()
{

    return(
      <div>
      <div className=" hidden md:flex text-primary  justify-between items-center">
<p className=" tracking-wide text-[14px] fontStyle">Get up to 50% off new season styles, limited time only</p>
<div className="flex">
  <Link to={"/Footer"}>
  <p className="mx-5 hoverSec">Help Center</p></Link>
  <Link to={"/Footer"}><p className="hoverSec">Order Tracking</p></Link>
</div></div>
      </div>
    );
}