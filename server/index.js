const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;

const calculateRoute = require("./routes/calculate.js"); // مسیر فایل خودت
const saveRoute = require("./routes/save.js"); // مسیر فایل خودت
const dataRoute = require("./routes/data.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// سرو فایل HTML
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
//salalm

app.use("/api", calculateRoute);
app.use("/api", saveRoute);
app.use("/api", dataRoute);

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});
