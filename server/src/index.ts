import express, { Request, Response } from "express";
import cors from "cors";
import api from "./api/api";
import https from "http";
import fs from "fs";
import path from "path";
import util from "util";
import "dotenv/config";

const app = express();
const PORT = (process.env.PORT as number | undefined) || 8080;

app.use(
  cors({
    origin: [
      "https://localhost:3000",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:4200",
      "https://localhost:4200",
      "http://192.168.254.32:3000",
      "https://192.168.254.32:3000",
      "https://playful-meerkat-6d44db.netlify.app",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", api);

app.get("/", (request: Request, response: Response) => {
  response.send({ message: "hello from home" });
});

//HTTP
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server started at http://localhost:${PORT}`);
// });

//HTTPS

console.log(path.join(__dirname, "cert", "key.pem"));
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  } as https.ServerOptions,
  app
);

sslServer.listen(PORT, () => console.log(`Secure server on port ${PORT}`));