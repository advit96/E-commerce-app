const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.use("/api/products" , productRoutes);
app.use("/api/users" , userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
