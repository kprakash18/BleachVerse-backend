import express from "express";
import { errorHandler } from "./common/errors/errorHandler.js";
import characterRoute from "./modules/character/character.routes.js";
import { validateRequest } from "./common/middleware/validateRequest.js";
const app = express();

app.use(express.json());

// routes here
app.use("/api/v1", characterRoute);

app.use(errorHandler); // must come after routes

export default app;
