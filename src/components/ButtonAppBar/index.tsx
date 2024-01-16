import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import GenapAnimation from "@/animation/GenapAnimation";
import TextNeonAnimation from "@/animation/TextNeonAnimation";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <TextNeonAnimation />
          </Box>

          <GenapAnimation />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
