import { Stack, Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ButtonStep from "@/components/ButtonStep";

export default function Step({
  name,
  index,
  ask,
  explain,
  options,
  handleOnClick,
}: {
  name: string;
  index: number;
  ask: any;
  explain: any;
  options: any;
  handleOnClick: (value: any) => void;
}) {
  const handleClick = (value: any) => {
    const stepValue = { index, name, value };
    handleOnClick(stepValue);
  };

  const FormatAsk = ({ ask }: { ask: string }) => {
    const theme = useTheme();
    const parts = ask.split(/({[^{}]+})/);

    return (
      <>
        {parts.map((part: string, index: number) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            return (
              <Box
                key={index}
                sx={{ display: "inline", color: theme.palette.primary.main }}
                color="error"
              >
                {part.substring(1, part.length - 1)}
              </Box>
            );
          } else {
            return part;
          }
        })}
      </>
    );
  };

  const FormatExplain = ({ explain }: { explain: string }) => {
    const formattedExplain = explain
      .replace("\\n", "<br />")
      .replace(/\n/g, "<br />");

    return <div dangerouslySetInnerHTML={{ __html: formattedExplain }} />;
  };

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
          textAlign="center"
          fontSize={{ xs: 14, sm: 14, md: 20 }}
        >
          <FormatExplain explain={explain} />
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
          align="center"
        >
          <FormatAsk ask={ask} />
        </Typography>

        <Typography variant="body1" component="h1" gutterBottom sx={{ pb: 2 }}>
          Clique para avançar de etapa
        </Typography>
      </Stack>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        spacing={2}
      >
        {options.map((option: any, index: any) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ButtonStep
              value={option.value}
              icon={option.icon}
              title={option.title}
              desc={option.desc}
              handle={handleClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
