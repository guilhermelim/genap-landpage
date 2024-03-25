import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import ButtonAppBar from "@/components/ButtonAppBar";
import { getLeeds, deleteLeed } from "@/services/leed.service";
import LeedCard from "@/components/LeedCard";
import hasDifference from "@/utils/hasDifference";

function RestrictedPage() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <ButtonAppBar />
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography variant="h4" component="h1" textAlign="center">
            Essa é uma página restrita!
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            color="error"
            textAlign="center"
          >
            Você não está autorizado a acessar esse conteúdo.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

function AuthorizedPage() {
  const [leedsList, setLeedsList] = useState<any[]>([]);
  const [oldLeedsList, setOldLeedsList] = useState<any[]>([]); // Estado para armazenar a lista antiga de leads
  const [timeRemaining, setTimeRemaining] = useState(10); // Estado para armazenar o tempo restante até a próxima atualização
  const [autoUpdate, setAutoUpdate] = useState(true); // Estado para controlar a atualização automática

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const toggleAutoUpdate = () => {
    setAutoUpdate((prevAutoUpdate) => !prevAutoUpdate); // Inverte o estado atual de autoUpdate
  };

  const listLeeds = async () => {
    try {
      const response = await getLeeds();

      if (response.status === 200) {
        const newLeedsData = response.data;
        setOldLeedsList(leedsList); // Atualiza a lista antiga com a lista atual antes de atualizar leedsList
        setLeedsList(newLeedsData);
      } else {
        throw Error("Erro ao obter lista de Leed:", response.data.error);
      }
    } catch (error) {
      setOldLeedsList([]);
      setLeedsList([]);
      console.error("Erro ao processar a requisição:", error);
    }
  };

  const removeLeed = async (id: string) => {
    try {
      const response = await deleteLeed(id);
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: "success" });

        listLeeds();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      enqueueSnackbar(`Erro ao processar a requisição: ${error}`, {
        variant: "error",
      });
      console.error("Erro ao processar a requisição:", error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (autoUpdate) {
      timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining((prevTime) => prevTime - 1);
        } else {
          listLeeds();
          setTimeRemaining(10);
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdate, timeRemaining]);

  useEffect(() => {
    listLeeds(); // Chama listLeeds() inicialmente ao montar o componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshButtonClick = () => {
    listLeeds(); // Chama listLeeds() quando o botão de atualizar é clicado
    setTimeRemaining(10); // Reinicia o tempo restante para a próxima atualização
  };

  // Função para determinar se um lead é novo
  const isNewLead = (lead: any) => {
    return !oldLeedsList.some((oldLead) => oldLead._id === lead._id);
  };

  // Função para determinar se um lead foi atualizado
  const isUpdatedLead = (lead: any) => {
    // Procura o lead na lista antiga
    const oldLead = oldLeedsList.find((oldLead) => oldLead._id === lead._id);
    if (!oldLead) {
      // Se o lead não existir na lista antiga, significa que é novo
      return false;
    }
    // Verifica se houve alguma diferença entre os dados antigos e novos do lead
    return hasDifference(oldLead, lead);
  };

  return (
    <Box>
      <ButtonAppBar />
      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, pt: 15 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography variant="h4" component="h1" textAlign="center">
            Aqui você encontra a lista de leeds que acessaram o formulário.
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            color="error"
            textAlign="center"
          >
            Você pode utilizar filtros personalizados para segmentar melhor seus
            resultados.
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleRefreshButtonClick}
            >
              Atualizar Lista {autoUpdate && `(${timeRemaining}s)`}
            </Button>

            <Button
              variant={autoUpdate ? "outlined" : "contained"}
              // color={autoUpdate ? "primary" : "default"}
              size="large"
              onClick={toggleAutoUpdate}
            >
              {autoUpdate
                ? "Desativar Atualização Automática"
                : "Ativar Atualização Automática"}
            </Button>
          </Stack>

          {leedsList.length === 0 ? (
            <Typography variant="h6" component="p" mt={3}>
              Não há leads cadastrados.
            </Typography>
          ) : (
            <Box>
              <Typography variant="h6" component="p" mt={3} mb={2}>
                Número de Leeds: {leedsList.length}
              </Typography>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {leedsList
                  .sort((a, b) => {
                    const dateA = new Date(a.updatedAt).getTime();
                    const dateB = new Date(b.updatedAt).getTime();
                    return dateB - dateA; // Ordena do mais recente para o mais antigo
                  })
                  .map((leed, index) => (
                    <Grid item key={leed._id} xs={12} sm={6} md={3}>
                      <LeedCard
                        leed={leed}
                        isNew={isNewLead(leed)} // Passa o valor de isNew para o LeedCard
                        isUpdated={isUpdatedLead(leed)} // Passa o valor de isUpdated para o LeedCard
                        key={leed._id}
                        onDelete={() => removeLeed(leed._id)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default function Index() {
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    setIsDevelopment(process.env.NEXT_PUBLIC_VERCEL_ENV === "development");
  }, []);
  return <Box>{isDevelopment ? <AuthorizedPage /> : <RestrictedPage />}</Box>;
}
