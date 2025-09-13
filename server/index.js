const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3000;

// const saveRoute = require("./routes/save.js"); // مسیر فایل خودت
// const calculateRoute = require("./routes/calc.js"); // مسیر فایل خودت
// const dataRoute = require("./routes/data.js");
const usersRoute = require("./routes/users.js");

const app = express();
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation using Swagger in Express",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API docs (JSDoc comments)
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({ extended: true }));
// سرو فایل HTML
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
//salalm
// app.use("/api", saveRoute);
// app.use("/api", calculateRoute);
app.use("/api/users", usersRoute);

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});
