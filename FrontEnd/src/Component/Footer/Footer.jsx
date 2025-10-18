import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Button, IconButton } from '@mui/material';
import { Facebook, YouTube, Pinterest, Instagram } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Footer()
{

    return (
      
          <footer className=" mb-[90px] md:mb-0 bg-five text-primary">
            <div className=" py-1 tracking-wider container mx-auto xl:px-[30px]">
     <div className='my-[35px] grid sm:grid-cols-3 grid-cols-2 xl:grid-cols-5 w-fit justify-between items-center mx-auto'>
     <div className="hoverPrimary p-5  h-[160px]  flex flex-col justify-center items-center ">
         <LocalShippingOutlinedIcon className='icon' style={{fontSize: "40px", marginBottom: "6px"}} />
          <p className=' font-bold text-md pb-3 '>Free Shipping </p>
<p className=' text-sm'> For all Orders Over $100</p>
     </div>
     <div className="hoverPrimary p-5  h-[160px]  flex flex-col justify-center items-center ">
          <RepeatOutlinedIcon className='icon' style={{fontSize: "40px", marginBottom: "6px"}} />
          <p className=' font-bold text-md pb-3 '>30 Days Returns </p>
<p className=' text-sm'>For an Exchange Product</p>
     </div>
     <div className="hoverPrimary p-5  h-[160px]  flex flex-col justify-center items-center ">
               <PaymentOutlinedIcon className='icon' style={{fontSize: "40px", marginBottom: "6px"}} />
             <p className=' font-bold text-md pb-3 '>Secured Payment </p>
<p className=' text-sm'> Payment Cards Accepted</p>
     </div>
     <div className="hoverPrimary p-5  h-[160px]  flex flex-col justify-center items-center ">
          <CardGiftcardOutlinedIcon className='icon' style={{fontSize: "40px", marginBottom: "6px"}} />
<p className=' font-bold text-md pb-3 '> Special Gifts </p>
<p className=' text-sm'> Our First Product Order </p>    </div>
     <div  className=" hoverPrimary p-5  h-[160px]  flex flex-col justify-center items-center ">
        <HeadphonesOutlinedIcon className='icon' style={{fontSize: "40px", marginBottom: "6px"}} />
        <p className=' font-bold text-md pb-3 '>Support 24/7 </p>
<p className=' text-sm'> Contact us Anytime</p>
     </div>
     </div>
     <hr className=' text-tertiary'/>

<div className="p-5 flex flex-wrap justify-center gap-10   text-sm">

  {/* Contact Us */}
  <div className="relative leading-8 border-none md:border-r  border-tertiary pr-4">
    <h3 className="text-xl pb-3 font-bold">Contact Us</h3>
    <p className=' text-sm'>
      SaloShop - Mega Super Store<br />
      507-Union Trade Centre France
    </p>
    <small>sales@yourcompany.com</small>
    <p className=' text-secondary text-2xl font-bold'>(+20)01015024356</p>
    <div className="flex items-center gap-2 mt-2 text-gray-800">
      <ChatBubbleOutlineIcon style={{color: '#ff5252', fontSize: "40px"}} className="text-tertiary" />
      <span>Online Chat Get Expert Help</span>
    </div>
  </div>

  {/* Product */}
  <div className=" leading-8 w-[32%] xl:w-[20%]">
    <h3 className="text-xl pb-3 font-bold">Product</h3>
    <ul className="space-y-1">
      <li>Prices drop</li>
      <li>New products</li>
      <li>Best sales</li>
      <li>Contact us</li>
      <li>Sitemap</li>
      <li>Stores</li>
    </ul>
  </div>

  {/* Our Company */}
  <div className="leading-8 w-[32%] xl:w-[20%]">
    <h3 className="text-xl pb-3 font-bold">Our Company</h3>
    <ul className="space-y-1">
      <li>Delivery</li>
      <li>Legal Notice</li>
      <li>Terms and conditions of use</li>
      <li>About us</li>
      <li>Secure payment</li>
      <li>Login</li>
    </ul>
  </div>

  {/* Newsletter */}
  <div className="leading-8 max-w-md w-[100%] sm:w-[25%]  md:grow">
    <h3 className="text-xl pb-3 font-bold">Subscribe to newsletter</h3>
    <p className="mb-3">Subscribe to our latest newsletter to get news about special discounts.</p>
    
    <input
      type="email"
      placeholder="Your Email Address"
      className="w-full border border-gray-300 p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-tertiary"
    />
<Button
          variant="contained"
className='hover:!bg-black !px-10 transition-all !duration-100 !my-3 !font-semibold  !bg-secondary !text-white'  
        >
      Subscribe
        </Button>

   <FormControlLabel  control={<Checkbox style={{color: "#ff5252"}} defaultChecked />} style={{userSelect: "none"}} label="I agree to the terms and conditions and the privacy policy" />

  </div>
</div>
      </div>

<div className='bg-white py-1 items-center container mx-auto xl:px-[30px] flex flex-col md:flex-row justify-between '>
        <div >
          <IconButton className='hover:!bg-secondary hover:!text-white'><Facebook  /></IconButton>
          <IconButton className='hover:!bg-secondary hover:!text-white'><YouTube/></IconButton>
          <IconButton className='hover:!bg-secondary hover:!text-white'><WhatsAppIcon/></IconButton>
          <IconButton className='hover:!bg-secondary hover:!text-white'><Instagram /></IconButton>
        </div>

        {/* Center text */}
        <small variant="body2" color="text.secondary">
          © 2024 - Ecommerce Template
        </small>

        {/* Payment Methods */}
        <div className='flex pt-[10px] md:p-0'>
          <img loading="lazy" src="/images/carte_bleue.png" alt="CB" className=' w-[40px] h-[30px]' />
          <img loading="lazy" src="/images/visa.png" alt="VISA" className=' w-[40px] h-[30px]' />
          <img loading="lazy" src="/images/master_card.png" alt="MasterCard" className=' w-[40px] h-[30px]' />
          <img loading="lazy" src="/images/american_express.png" alt="Amex" className=' w-[40px] h-[30px]' />
          <img loading="lazy" src="/images/paypal.png" alt="PayPal" className=' w-[40px] h-[30px]' />
    </div>
</div>
  </footer>
    )
}