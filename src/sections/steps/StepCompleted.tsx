import { Stack, Box, Typography, CardMedia, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "@/components/Iconify";

export default function StepCompleted({
  nextStep,
  index,
}: {
  nextStep: (value: any) => void;
  index: number;
}) {
  const theme = useTheme();

  const handleClick = (value: any) => {
    const stepValue = {
      index: index,
      name: "Nos Conheça",
      value: value,
    };
    nextStep(stepValue);
  };

  return (
    <Box>
      {" "}
      <Box maxHeight="lg">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
          sx={{ py: 2 }}
        >
          <CardMedia
            component="img"
            image="/img/logo.png"
            alt="Picture of the logo"
            sx={{
              width: "30vh",
              height: "auto",
            }}
          />

          <Typography
            variant="h3"
            component="h1"
            fontSize={{ xs: 35, sm: 35, md: 50 }}
            align="center"
          >
            Entraremos em
            <Box
              sx={{ display: "inline", color: theme.palette.primary.main }}
              color="error"
            >
              {" "}
              contato{" "}
            </Box>
            com Você!
          </Typography>

          <Typography
            sx={{ py: 2 }}
            variant="body1"
            component="h1"
            textAlign="center"
            fontSize={{ xs: 14, sm: 14, md: 20 }}
            color="error"
          >
            Entraremos em contato o mais breve possível através dos dados que
            deixou para contato.
          </Typography>
        </Stack>
      </Box>
      <Typography
        variant="h3"
        component="h1"
        fontSize={{ xs: 17.5, sm: 17.5, md: 50 }}
        align="center"
      >
        Nossa equipe entrará em contato em breve para{" "}
        <Box
          sx={{ display: "inline", color: theme.palette.primary.main }}
          color="error"
        >
          agendarmos
        </Box>{" "}
        uma reunião dentro das próximas{" "}
        <Box
          sx={{ display: "inline", color: theme.palette.primary.main }}
          color="error"
        >
          24 horas
        </Box>
        .
      </Typography>
      <Typography sx={{ py: 2 }} component="h1" textAlign="center"></Typography>
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        height={100}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "blue" }}
          startIcon={
            <Iconify
              icon="vscode-icons:file-type-appsemble"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />
          }
        >
          Veja nossa vasta gama de projetos entregues!
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "green" }}
          startIcon={
            <Iconify
              icon="logos:whatsapp-icon"
              color="primary"
              sx={{
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            />
          }
        >
          Não quero esperar!
          <br />
          Entre em contato conosco via WhatsApp!
        </Button>
      </Stack> */}
    </Box>
  );
}
