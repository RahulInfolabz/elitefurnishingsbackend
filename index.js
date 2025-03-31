const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb");
const fetchAllCategories = require("./Api/User/Categories/fetchAllCategories");
const insertCategories = require("./Api/Admin/Categories/insertCategories");
const insertFurnitures = require("./Api/Admin/Furnitures/insertFurnitures");
const fetchAllFurnitures = require("./Api/User/Furnitures/fetchAllFurnitures");
const insertFurniture = require("./Api/Admin/Furnitures/insertFurniture");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDb();

// user side api urls
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Connected.",
    apis: { categories: "", furnitures: "" },
  });
});

app.get("/categories", fetchAllCategories);
app.get("/furnitures", fetchAllFurnitures);

// admin api
app.post("/insertCategories", insertCategories);
app.post("/insertFurniture", insertFurniture);
app.post("/insertFurnitures", insertFurnitures);

app.listen(PORT, () => {
  console.log("Server Started At Port :", PORT);
});
