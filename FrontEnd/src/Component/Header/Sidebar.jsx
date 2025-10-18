import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SortIcon from '@mui/icons-material/Sort';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    setState({ ...state, [anchor]: open });
  };
  
  const list = (anchor) => (
    <Box
    className='p-2 pt-4'
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    
    >
         <Link to={"/"}>
    <img  className='w-[170px] mb-[20px]' src="/images/file_0000000075fc61f6b3f3242d0edc5d05.png" alt="" />
      </Link>  
        <Button 
        style={{color: "rgb(62, 62, 62)", width: "100%"}}
     onClick={toggleDrawer(anchor, false)}
     onKeyDown={toggleDrawer(anchor, false)} variant="text" className='hoverSec' startIcon={<CloseIcon />}>
  Shop By Categories
</Button>
        {[{head: "Fashion", brand:[ {id:1, name: "Fashion Women"}, {id:2, name: "Fashion Men"}]},
        {head: "Electronics", brand:[{id:3, name: "Phone"},{id:4, name: "LapTop"},{id:15, name: "Watches"}]},
      {head: "Bags", brand:[{id:5, name: "Women Bags"},{id:6, name: "Men Bags"}]},
    {head: "Footwear", brand:[{id:7, name: "Women Footwear"},{id:8, name: "Men Footwear"}]},
  {id:9, head: "Groceries"}, {id:10, head: "Beauty"}, {id:13, head: "Jewellery"}].map((text) => (
           <Accordion   sx={{
    border: 'none',             
    boxShadow: 'none',          
    '&:before': {
      display: 'none',
    },
  }} key={text.head} disablePadding>
       {text.brand? <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography  component="span">{text.head}</Typography>
        </AccordionSummary>
          :<Link onClick={toggleDrawer(anchor, false)} to={`/ShowProductsBrand/${text.id}`} key={text.id}><Typography className=' hoverSec !my-3  !pl-4'>{text.head}</Typography></Link>
}
        <AccordionDetails className=' !pl-7'>
           {text.brand&& text.brand.map((ele) => ( <Link onClick={toggleDrawer(anchor, false)} to={`/ShowProductsBrand/${ele.id}`} key={ele.id}> <p className=' !py-2 hoverSec' > {ele.name}</p></Link>))}
               </AccordionDetails> 
      </Accordion>
        )) }
    </Box>);
    

  return (
    <div >
      <div onClick={toggleDrawer("left", true)} className='hoverTertiary md:pr-12 pl-2 cursor-pointer rounded-2xl py-1 flex items-center space-x-1 text-primary'>
        <SortIcon/>
<p className=' hidden md:block  text-xl text-primary font-[700] ' >Open Sidebar</p>
</div>
<Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
  {list("left")}
</Drawer>
 
    </div>
  );
}