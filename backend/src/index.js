import express from 'express';
import "dotenv/config";
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL
const publicDir = path.join(process.cwd(), 'public');

app.use(clerkMiddleware())
app.use(express.json())
app.use(cors(origin= FRONTEND_URL, credentials = true))
// console.log("DB_URL =" + process.env.DB_URL);

app.get("/health", (req, res)=> {
  res.status(200).json({ok: true})
})

if(fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });

}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is up and running fast on port ${PORT}`);
});