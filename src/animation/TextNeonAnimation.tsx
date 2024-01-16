// src/animation/TextNeonAnimation.tsx
import React from "react";
import { Box, styled } from "@mui/system";

const NeonText = styled(Box)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  transition: "all 0.5s",
  textShadow: `
  0 0 1px ${theme.palette.primary.dark},
  0 0 5px ${theme.palette.primary.dark},
  0 0 10px ${theme.palette.primary.dark},
  0 0 20px ${theme.palette.primary.dark},
  0 0 30px ${theme.palette.primary.dark},
  0 0 40px ${theme.palette.primary.dark},
  0 0 70px ${theme.palette.primary.dark},
  0 0 80px ${theme.palette.primary.light},
  0 0 100px ${theme.palette.primary.light},
  0 0 150px ${theme.palette.primary.main}
  `,
  "&:hover, &:focus": {
    color: theme.palette.primary.main,
    textShadow: `
    0 0 1px ${theme.palette.primary.light},
    0 0 5px ${theme.palette.primary.light},
    0 0 10px ${theme.palette.primary.light},
    0 0 20px ${theme.palette.primary.light},
    0 0 30px ${theme.palette.primary.light},
    0 0 40px ${theme.palette.primary.dark},
    0 0 70px ${theme.palette.primary.dark},
    0 0 80px ${theme.palette.primary.dark},
    0 0 100px ${theme.palette.primary.dark},
    0 0 150px ${theme.palette.primary.main} 
    `,
  },
}));

const TextNeonAnimation: React.FC = () => {
  return (
    <Box component="div" sx={{ fontSize: "3vmin" }}>
      <NeonText component="div" className="text-pink">
        GENAP
      </NeonText>
    </Box>
  );
};

export default TextNeonAnimation;
