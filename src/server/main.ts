import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import professor from "./professor.ts";

const app = express();
app.use(express.json());
app.use(cors());
app.use(professor);

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 8080, () =>
  console.log("Server is listening on port 8080...")
);
