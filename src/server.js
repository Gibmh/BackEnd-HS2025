import express from "express";
import bodyParser from "body-parser";
// import initWebroutes from "./routes/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import {
  ReadData,
  CreateData,
  ReadID,
  UpdateData,
  DeleteData,
} from "./controllers/homeController";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
connectDB();

app.get("/api/get-object-list", ReadData);
app.post("/api/create-object", CreateData);
app.get("/api/get-ob-by-id", ReadID);
app.post("/api/update-object", UpdateData);
app.post("/api/delete-object", DeleteData);

let port = process.env.PORT || 3030;
// port == undifined => port = 3030
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
