import React from "react";
import { Stack, Paper, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";

export default function ButtonStep({
  value,
  icon,
  title,
  desc,
  handle,
}: {
  value: any;
  icon: string;
  title: string;
  desc: string;
  handle: (value: any) => void;
}) {
  const theme = useTheme();

  const handleClick = () => {
    handle(value);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Paper
        sx={{
          textAlign: "center",
          backgroundColor: "#1A2027",
          ...theme.typography.body2,
          paddingY: theme.spacing(4),
          color: theme.palette.text.primary,
          height: 200,
          "&:hover": {
            backgroundColor: "#2C3643", // Cor que será aplicada ao passar o mouse

            boxShadow: `
                0 0 1px ${theme.palette.primary.dark},
                0 0 5px ${theme.palette.primary.dark},
                0 0 10px ${theme.palette.primary.dark},
                0 0 13px ${theme.palette.primary.light},                                  
                0 0 15px ${theme.palette.primary.main}
                `,
          },
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Iconify
            icon={icon}
            color="primary"
            sx={{
              color: theme.palette.primary.main,
              width: 40,
              height: 40,
            }}
          />

          <Typography variant="h6" component="h1">
            {title}
          </Typography>

          <Typography variant="body2" component="h1">
            {desc}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
