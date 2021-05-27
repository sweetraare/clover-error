const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//constants
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === "development";

//init server config
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//router
const router = require("./src/routes");

// charge payment
// here is the error
app.use("/charge", router.chargeRoutes);

//starting server
if (isDevelopment) {
  app.listen(port, () => {
    console.log("* This server is running on development mode *");
    console.log(`Server on port ${port}`);
  });
} else {
  const https = require("https");
  const fs = require("fs");

  const https_options = {
    key: fs.readFileSync(`${process.env.CERTS_PATH}/privkey.pem`),
    cert: fs.readFileSync(`${process.env.CERTS_PATH}/fullchain.pem`),
    ca: [
      fs.readFileSync(`${process.env.CERTS_PATH}/bundle.pem`),
      fs.readFileSync(`${process.env.CERTS_PATH}/chain.pem`),
    ],
  };

  //starting production server
  https.createServer(https_options, app).listen(port);
}
