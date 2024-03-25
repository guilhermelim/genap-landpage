import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { fDateTime } from "@/utils/format-time";

interface LeedCardProps {
  leed: any;
  isNew: boolean;
  isUpdated: boolean;
  onDelete: (id: string) => void; // Função para lidar com a exclusão do lead
}

const LeedCard: React.FC<LeedCardProps> = ({
  leed,
  isNew,
  isUpdated,
  onDelete,
}) => {
  const theme = useTheme();
  const { _id, queryParams, fingerprinting, selectedOptions, updatedAt } = leed;

  const [openModal, setOpenModal] = useState(false);

  const handleClickDelete = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmDelete = () => {
    onDelete(_id); // Chama a função de exclusão passando o ID do lead
    setOpenModal(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: isNew ? "#4CAF50" : "#262b32", // Verde se for novo, senão padrão
        ...theme.typography.body2,
        boxShadow: "3px 5px 10px rgba(0, 0, 0, 0.6)",
        borderRadius: 2,
        color: theme.palette.text.primary,
        position: "relative",
        "&:hover": {
          backgroundColor: isNew ? "#4CAF50" : "#2C3643", // Verde se for novo, senão padrão
          boxShadow: `
            0 0 1px ${theme.palette.primary.dark},
            0 0 5px ${theme.palette.primary.dark},
            0 0 10px ${theme.palette.primary.dark},
            0 0 13px ${theme.palette.primary.light},                                  
            0 0 15px ${theme.palette.primary.main}
          `,
        },
      }}
    >
      {isNew && (
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            padding: theme.spacing(0.5),
            borderRadius: "0 0 0 8px",
          }}
        >
          NOVO
        </Typography>
      )}
      {isUpdated && (
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            padding: theme.spacing(0.5),
            borderRadius: "0 0 8px 0",
          }}
        >
          ATUALIZADO
        </Typography>
      )}

      <CardContent sx={{ mt: 2 }}>
        <Typography variant="h6">Nome: {queryParams?.name || ""}</Typography>
        <Typography variant="body1">
          Email: {queryParams?.email || ""}
        </Typography>
        <Typography variant="body2">
          Idioma: {fingerprinting?.language?.browserLanguage || ""}
        </Typography>
        <Typography variant="body2">
          Localização: {fingerprinting?.ipLocation?.city || ""},{" "}
          {fingerprinting?.ipLocation?.region || ""},{" "}
          {fingerprinting?.ipLocation?.country || ""}
        </Typography>
        <Accordion
          sx={{ mt: 2, mb: 2 }}
          disabled={selectedOptions.length === 0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              Preenchimento do Formulário
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {selectedOptions.map((option: any, index: number) => (
                <div key={index}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight="bold">
                      {option.name}:{" "}
                      {typeof option.value === "object" ? (
                        <ul>
                          {Object.keys(option.value).map(
                            (key: string, idx: number) => (
                              <li key={idx}>
                                <Box component="span" fontWeight="bold">
                                  {key}
                                </Box>
                                :{" "}
                                <Box
                                  component="span"
                                  color={theme.palette.primary.main}
                                >
                                  {option.value[key]}
                                </Box>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <Box
                          component="span"
                          color={theme.palette.primary.main}
                        >
                          {option.value}
                        </Box>
                      )}
                    </Box>
                  </Typography>
                </div>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ pt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              button: 0,
              left: 0,
              backgroundColor: theme.palette.primary.main,
              color: "white",
              padding: theme.spacing(0.5),
              borderRadius: "0 0 8px 0",
            }}
          >
            Data: {fDateTime(updatedAt) || ""}
          </Typography>

          <IconButton
            aria-label="delete"
            onClick={handleClickDelete}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              m: 1,
            }}
            size="small"
          >
            <DeleteIcon />
          </IconButton>

          {/* Modal de confirmação para exclusão */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmação de Exclusão"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tem certeza de que deseja excluir este lead?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Voltar
              </Button>
              <Button onClick={handleConfirmDelete} color="error" autoFocus>
                Excluir
              </Button>
            </DialogActions>
          </Dialog>
          {/* Fim do modal */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeedCard;
