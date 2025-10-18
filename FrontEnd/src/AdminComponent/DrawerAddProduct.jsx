import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddProduct from "./AddProduct";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: grey[100],
  ...theme.applyStyles("dark", {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles("dark", {
    backgroundColor: grey[900],
  }),
}));

function DrawerAddProduct({ open, onClose, window }) {
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `100%`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        swipeAreaWidth={drawerBleeding}
        keepMounted
      >
        {/* الهاندل اللي فوق */}
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            Add New Product
          </Typography>
        </StyledBox>

        {/* الفورم */}
        <StyledBox
          sx={{
            px: 3,
            pt: 2,
            pb: 4,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <AddProduct onClose={onClose} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

DrawerAddProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  window: PropTypes.func,
};

export default DrawerAddProduct;
