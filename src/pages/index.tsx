import React, { useState, useEffect } from "react";
import Link from "@/src/Link";
import {
  Container,
  Stack,
  Paper,
  Box,
  Typography,
  Button,
  CardMedia,
  Fab,
  Grid,
  ButtonGroup,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ButtonAppBar from "@/components/ButtonAppBar";
import Iconify from "@/components/Iconify";

interface StepProps {
  nextStep: () => void;
}

function Step0({ nextStep }: StepProps) {
  const theme = useTheme();

  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
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

        <Typography variant="h4" component="h1">
          Deixe a gente entender o que você precisa
        </Typography>

        <Typography variant="h5" component="h2" color="error">
          Não demora nem 2 minutinhos!
        </Typography>

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
            onClick={nextStep}
          >
            Vamos começar!
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function Step1({ nextStep }: StepProps) {
  const theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    cursor: "pointer",
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    paddingBlock: theme.spacing(7),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "#2C3643", // Cor que será aplicada ao passar o mouse
    },
  }));

  return (
    <Box maxHeight="lg">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Typography
          variant="body1"
          component="h1"
          fontSize={{ xs: 14, sm: 14, md: 20 }}
        >
          São só algumas perguntas para que nossa equipe possa entrar em contato
          com você!
        </Typography>
        <Typography
          variant="body1"
          component="h1"
          fontSize={{ xs: 14, sm: 14, md: 20 }}
        >
          Basta clicar no botão de casa opção ou arrastar a tela para baixo para
          mais opções.
        </Typography>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{ py: 2 }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontSize={{ xs: 35, sm: 35, md: 50 }}
        >
          O que{" "}
          <Box
            sx={{ display: "inline", color: theme.palette.primary.main }}
            color="error"
          >
            você
          </Box>{" "}
          precisa?
        </Typography>

        <Typography variant="body1" component="h1" gutterBottom sx={{ pb: 2 }}>
          Clique para avançar de etapa
        </Typography>
      </Stack>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        xs={12}
        sm={12}
        md={12}
      >
        <Grid xs={12} sm={6} md={3}>
          <Item>
            <Iconify
              icon="fluent:phone-tablet-24-filled"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />

            <Typography variant="h6" component="h1">
              Aplicativo
            </Typography>

            <Typography variant="body2" component="h1">
              Para você que precisa desenvolver algo para celulares
            </Typography>
          </Item>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Item>
            <Iconify
              icon="iconoir:laptop-dev-mode"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />

            <Typography variant="h6" component="h1">
              Software
            </Typography>

            <Typography variant="body2" component="h1">
              Para você que precisa desenvolver um sistema local
            </Typography>
          </Item>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Item>
            <Iconify
              icon="mdi:web"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />

            <Typography variant="h6" component="h1">
              Website
            </Typography>

            <Typography variant="body2" component="h1">
              Para você que precisa desenvolver um sistema de acesso remoto
            </Typography>
          </Item>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Item>
            <Iconify
              icon="pepicons-pencil:handshake"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />

            <Typography variant="h6" component="h1">
              Terceirização
            </Typography>

            <Typography variant="body2" component="h1">
              Para você que precisa sempre desenvolver e quer uma equipe
              especializada
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [StepPadding, setStepPadding] = useState<number>(20);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    const isFirstStep = step === 0;
    isFirstStep ? setStepPadding(20) : setStepPadding(5);
  }, [step]);

  return (
    <Box>
      <ButtonAppBar />
      <Container component="main" maxWidth="xl">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          padding={{ xs: 5, sm: 5, md: StepPadding }}
          maxHeight="lg"
        >
          {step === 0 && <Step0 nextStep={handleNextStep} />}

          {step > 0 && (
            <Fab
              size="medium"
              aria-label="add"
              sx={{
                backgroundColor: "#1A2027",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2C3643", // Cor que será aplicada ao passar o mouse
                },
              }}
            >
              <Typography component="h4">{step}/6</Typography>
            </Fab>
          )}

          {step === 1 && <Step1 nextStep={handleNextStep} />}
        </Stack>
      </Container>
    </Box>
  );
}
