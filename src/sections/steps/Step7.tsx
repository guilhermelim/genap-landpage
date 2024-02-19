import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import FormProvider, {
  RHFTextField,
  RHFRadioGroup,
} from "@/components/hook-form";
import { Stack, Box, Typography, CardMedia } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";

const defaultValues = {
  fullName: "Guilherme Lima",
  phone: "85992704305",
  email: "guilhermem.lima@outlook.com",
  ideaDescription: "",
  startProjectDescription: "",
  companySize: "1 a 10",
};

const validationSchema = yup.object({
  fullName: yup.string().required("Nome completo é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  ideaDescription: yup.string(),
  startProjectDescription: yup.string(),
  companySize: yup.string().required("Número de colaboradores é obrigatório"),
});

export default function Step7({
  nextStep,
}: {
  nextStep: (value: any) => void;
}) {
  const theme = useTheme();

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  });

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = (data: any) => handleClick(data);

  const handleClick = (value: any) => {
    const stepValue = {
      index: 7,
      name: "Formulário",
      value: value,
    };
    nextStep(stepValue);
  };

  return (
    <Box>
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
            Você possui mais algum
            <Box
              sx={{ display: "inline", color: theme.palette.primary.main }}
              color="error"
            >
              detalhe
            </Box>
            ?
          </Typography>

          <Typography
            sx={{ py: 2 }}
            variant="body1"
            component="h1"
            textAlign="center"
            fontSize={{ xs: 14, sm: 14, md: 20 }}
            color="error"
          >
            Sinta-se a vontade para discorrer sobre sua demanda, qual a
            urgência, como funciona sua operação, etc.
            <br />
            Fique a vontade! Prezamos pelo total alinhamento!
          </Typography>
        </Stack>
      </Box>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField
              name={`fullName`}
              label="Nome completo"
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name={`phone`}
              label="Telefone"
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name={`email`}
              label="Email"
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name={`ideaDescription`}
              label="Nos conte um pouquinho sobre sua ideia!"
              multiline
              rows={4}
              InputLabelProps={{ shrink: true }}
            />

            <RHFTextField
              name={`startProjectDescription`}
              label="Quando quer dar início ao projeto?"
              multiline
              rows={4}
              InputLabelProps={{ shrink: true }}
            />

            <RHFRadioGroup
              row
              name="companySize"
              label="Número de colaboradores de sua empresa"
              spacing={4}
              options={[
                { value: "1 a 10", label: "1 a 10" },
                { value: "11 a 50", label: "11 a 50" },
                { value: "51 a 100", label: "51 a 100" },
                { value: "Acima de 100", label: "Acima de 100" },
              ]}
            />

            <Box textAlign="center">
              <LoadingButton
                loading={isSubmitting}
                type="submit"
                variant="contained"
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
              >
                Finalizar!
              </LoadingButton>
            </Box>

            {/* <Box>
              <Typography>pré-visualização:</Typography>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Box> */}
          </Stack>
        </FormProvider>
      </Stack>
    </Box>
  );
}
