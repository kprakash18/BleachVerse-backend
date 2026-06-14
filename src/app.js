import express from "express";
import { errorHandler } from "./common/errors/errorHandler.js";

const app = express();

app.use(express.json());

// routes here

app.use(errorHandler); // must come after routes

export default app;
