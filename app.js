const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const vehicleRouter = require("./routes/vehicle");

require("./db/mongoose");
require("dotenv").config();

const app = express();

//------ MIDDLEWARES -------
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//----- ROUTES MIDDLEWARE ------
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", vehicleRouter);

//----- CONNECTION TO MONGODB ---------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
