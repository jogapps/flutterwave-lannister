require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const routes = require("./src/api/routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;