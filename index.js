const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/connectDb");
const fetchAllCategories = require("./Api/User/Categories/fetchAllCategories");
const insertCategories = require("./Api/Admin/Categories/insertCategories");
const insertFurnitures = require("./Api/Admin/Furnitures/insertFurnitures");
const fetchAllFurnitures = require("./Api/User/Furnitures/fetchAllFurnitures");
const insertFurniture = require("./Api/Admin/Furnitures/insertFurniture");
const fetchFurnitureById = require("./Api/User/Furnitures/fetchFurnitureById");
const fetchFurnitureByCategory = require("./Api/User/Categories/fetchFurnituresByCategory");
const updateFurnitureCategory = require("./Api/User/Categories/updateCategoryId");
const deleteProductsByCategory = require("./Api/User/Furnitures/deleteFurnitures");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDb();

// user side api urls
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Connected.",
    apis: {
      categories: "https://elitefurnishingsbackend.onrender.com/categories",
      furnitures: "https://elitefurnishingsbackend.onrender.com/furnitures",
    },
  });
});

app.get("/categories", fetchAllCategories);
app.get("/furnitures", fetchAllFurnitures);
app.get("/furnitures/:furniture_id", fetchFurnitureById);
app.get("/category/:category_id", fetchFurnitureByCategory);

app.post("/updateFurnitureCategory", updateFurnitureCategory);
app.post("/deleteProductsByCategory/:category_id", deleteProductsByCategory);

// admin api
app.post("/insertCategories", insertCategories);
app.post("/insertFurniture", insertFurniture);
app.post("/insertFurnitures", insertFurnitures);

app.listen(PORT, () => {
  console.log("Server Started At Port :", PORT);
});
