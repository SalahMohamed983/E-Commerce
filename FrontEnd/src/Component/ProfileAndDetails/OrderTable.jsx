import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from "react-redux";
import { FetchOrder } from '../../Featured/OrderSlice';
import { Link } from 'react-router-dom';

function Row(props) {
  const { row, fullName } = props; // fullName جاية من اليوزر
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.payment}</TableCell>
        <TableCell align="left">{fullName}</TableCell>
        <TableCell align="left">{row.phoneNum}</TableCell>
        <TableCell align="left">{row.addressType}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead className="!bg-five">
                  <TableRow>
                    <TableCell>PRODUCT ID</TableCell>
                    <TableCell align="left">IMAGE</TableCell>
                    <TableCell>PRODUCT TITLE</TableCell>
                    <TableCell align="left">QUANTITY</TableCell>
                    <TableCell align="left">PRICE</TableCell>
                    <TableCell align="left">SUB TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>
                        <Link to={`/card/${product.productId}`}>
                          <img loading="lazy"
                            className="h-[50px] w-[50px] object-contain"
                            src={product.imageUrl}
                            alt={product.description}
                          />
                        </Link>
                      </TableCell>
                      <TableCell className="hoverSec" component="th" scope="row">
                        <Link to={`/card/${product.productId}`}>
                          {product.description}
                        </Link>
                      </TableCell>
                      <TableCell>{product.buyQuantity}</TableCell>
                      <TableCell align="left">{product.priceOfPice}</TableCell>
                      <TableCell align="left">
                        {product.priceOfPice * product.buyQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    payment: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    addressType: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        buyQuantity: PropTypes.number.isRequired,
        priceOfPice: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  fullName: PropTypes.string.isRequired,
};

export default function OrderTable() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Users.User || null);
  const Orders = useSelector((state) => state.Orders.Order || []);

  React.useEffect(() => {
    if (userData?.id) {
      dispatch(FetchOrder(userData.id));
    }
  }, [dispatch, userData]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className="!bg-five">
          <TableRow>
            <TableCell />
            <TableCell>ORDER ID</TableCell>
            <TableCell align="left">PAYMENT METHOD</TableCell>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="left">PHONE NUMBER</TableCell>
            <TableCell align="left">ADDRESS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Orders.length > 0 && Orders?.flatMap((user) =>
            user.orders.map((order) => (
              <Row key={order.id} row={order} fullName={user.fullName} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
