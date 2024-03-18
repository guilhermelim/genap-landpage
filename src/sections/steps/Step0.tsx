import { Stack, Box, Typography, Button, CardMedia } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Step0({
  nextStep,
}: {
  nextStep: (value: any) => void;
}) {
  const theme = useTheme();

  const handleClick = (value: any) => {
    const stepValue = {
      index: 0,
      name: "Vamos Começar",
      value: "Começou a preencher o formulário",
    };
    nextStep(stepValue);
  };

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
            width: "30vh",
            height: "auto",
          }}
        />

        <Typography variant="h4" component="h1" textAlign="center">
          Deixe-nos entender suas necessidades
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          color="error"
          textAlign="center"
        >
          Levará apenas 2 minutos!
        </Typography>

        <Box sx={{ pt: 2, maxWidth: "mg" }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              fontSize: "130%",
              borderRadius: 10,
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
            onClick={handleClick}
          >
            Vamos começar!
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
