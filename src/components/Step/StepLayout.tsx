import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Button, Fab } from "@mui/material";

export default function StepLayout({
  step,
  setStep,
  children,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}) {
  const [StepPadding, setStepPadding] = useState<number>(20);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    const isFirstStep = step === 0;
    isFirstStep ? setStepPadding(20) : setStepPadding(5);
  }, [step]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      paddingY={{ xs: 5, sm: 5, md: StepPadding }}
      maxHeight="lg"
    >
      {step > 0 && step < 7 && (
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

      {children}

      {step !== 0 && (
        <Box sx={{ pt: 2, width: "100%", display: "flex" }}>
          <Button
            color="inherit"
            disabled={step === 0}
            onClick={handleBackStep}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          {/* {step > 8 && (
            <Button variant="contained" onClick={handleNextStep}>
              {step === 7 ? "Finalizar" : "Próximo"}
            </Button>
          )} */}
        </Box>
      )}
    </Stack>
  );
}
