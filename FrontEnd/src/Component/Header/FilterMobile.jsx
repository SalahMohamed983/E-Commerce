import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FilterSidebar from '../Product/FilterSidbar';

export default function FilterMobile({state, toggleDrawer}) {
 
  




  const list = (anchor) => (
    <div
    className=' !w-full pb-5 !px-10'    
    >
      <FilterSidebar/>
     </div>
  );

  return (
    <div>
           {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor="bottom"
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            {list("bottom")}
          </Drawer>
       
    </div>
  );
}