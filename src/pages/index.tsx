import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@/src/Link";
import ProTip from "@/src/ProTip";
import Copyright from "@/src/Copyright";
import Image from "next/image";
import { Button, CardMedia } from "@mui/material";
import { Stack } from "@mui/material";
import ButtonAppBar from "@/components/ButtonAppBar";
import TextNeonAnimation from "@/animation/TextNeonAnimation";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      <ButtonAppBar />
      <Container component="main" maxWidth="lg">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ p: 20 }}
        >
          <CardMedia
            component="img"
            image="/img/logo.png"
            alt="Picture of the logo"
            sx={{
              width: "24%",
              height: "auto",
            }}
          />

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          >
            <Typography
              variant="h4"
              component="h1"
              // sx={{ textTransform: "uppercase" }}
            >
              Deixe a gente entender o que você precisa
            </Typography>

            <Typography variant="h5" component="h2" color="error">
              Não demora nem 2 minutinhos!
            </Typography>
          </Stack>

          <Box sx={{ pt: 2, maxWidth: "mg" }}>
            <Button
              variant="outlined"
              component={Link}
              noLinkStyle
              href="/"
              color="primary"
              size="large"
              sx={{
                borderRadius: 10,
                fontSize: "130%",
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
              }}
            >
              Vamos começar!
            </Button>
          </Box>

          {/* <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <Copyright /> */}
        </Stack>
      </Container>
    </Box>
  );
}
