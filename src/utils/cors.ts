import Cors from "cors";
import initMiddleware from "./init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true, // Permita cookies serem enviados junto com as requisições
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

export default cors;
