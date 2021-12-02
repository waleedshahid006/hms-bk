const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./src/api/auth");
const adminRoutes = require("./src/api/admin");
const cors = require("cors");
const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get("/", (_req, res) => res.send("API Running"));

// Define routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
