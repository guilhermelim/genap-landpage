// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/system";

// ----------------------------------------------------------------------

type IconifyProps = {
  icon: React.ReactNode; // Pode ser um elemento React ou uma string
  sx?: React.CSSProperties;
} & BoxProps;

export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
