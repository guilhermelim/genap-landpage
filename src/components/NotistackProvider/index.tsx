import PropTypes from "prop-types";
import { useRef } from "react";
import { SnackbarProvider, SnackbarContent, SnackbarKey } from "notistack";
// @mui
import { alpha, useTheme } from "@mui/material/styles";
import { Box, GlobalStyles } from "@mui/material";
// hooks
import IconButtonAnimate from "./IconButtonAnimate";
import Iconify from "../Iconify";
import { Collapse } from "@mui/material";

// ----------------------------------------------------------------------

function SnackbarStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "#__next": {
          "& .SnackbarContent-root": {
            width: "100%",
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: `0 1px 2px 0 ${alpha("#000000", 0.16)}`,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[800],
            backgroundColor: theme.palette.grey,
            "&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo":
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up("md")]: {
              minWidth: 240,
            },
          },
          "& .SnackbarItem-message": {
            padding: "0 !important",
            fontWeight: theme.typography.fontWeightMedium,
          },
          "& .SnackbarItem-action": {
            marginRight: 0,
            color: theme.palette.action.active,
            "& svg": { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

interface NotistackProviderProps {
  children?: React.ReactNode;
}

export default function NotistackProvider({
  children,
}: NotistackProviderProps): JSX.Element {
  const Direction = "rtl";
  const themeDirection = Direction === "rtl" ? "ltr" : "rtl";

  const isRTL = themeDirection === "rtl";

  const notistackRef = useRef<SnackbarProvider>(null);

  const onClose = (key: string) => () => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        TransitionComponent={isRTL ? Collapse : undefined}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        iconVariant={{
          info: <SnackbarIcon icon={"eva:info-fill"} color="info" />,
          success: (
            <SnackbarIcon
              icon={"eva:checkmark-circle-2-fill"}
              color="success" // "error" | "success" | "warning" | "info" | "primary" | "secondary" |
            />
          ),
          warning: (
            <SnackbarIcon icon={"eva:alert-triangle-fill"} color="warning" />
          ),
          error: <SnackbarIcon icon={"eva:alert-circle-fill"} color="error" />,
        }}
        // With close as default
        action={(key: any) => (
          <IconButtonAnimate
            size="small"
            onClick={onClose(key)}
            sx={{ p: 0.5 }}
          >
            <Iconify icon={"eva:close-fill"} />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

// ----------------------------------------------------------------------

interface SnackbarIconProps {
  icon?: string;
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
}

function SnackbarIcon({ icon, color }: SnackbarIconProps): JSX.Element {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        justifyContent: "center",
        // color: `${color}.main`,
        color: `white`,
        bgcolor: (theme) => alpha(theme.palette[color || "primary"].main, 0.16),
      }}
    >
      <Iconify icon={icon || ""} width={24} height={24} />
    </Box>
  );
}
