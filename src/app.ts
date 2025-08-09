import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
const app = express();
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());


export default app;
