import React from "react";
import { Add } from "@mui/icons-material";
import { Drawer as MuiDrawer, Typography } from "@mui/material";
import { drawerClasses } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import MenuContent from "./MenuContent";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <MenuContent />
      <div
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          padding: "12px",
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Typography
          sx={{ display: "flex", flexGrow: 1, alignItems: "center", gap: 2 }}
        >
          <Add sx={{ width: 24, height: 24 }} />
          <span>续订 Plus</span>
        </Typography>
      </div>
    </Drawer>
  );
}
