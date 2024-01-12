/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//  const {onRequest} = require("firebase-functions/v2/https");
//  const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const validator = require("email-validator");
const PORT = 3000;
const app = express();

const admin = require("firebase-admin");
admin.initializeApp();

const bodyParser = require("body-parser");
const paymentmethodRouter = require("./Router/paymentmethod");
const lineliffusersRouter = require("./Router/lineliffusers");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/carpark/paymentmethod", paymentmethodRouter);
app.use("/carpark/lineliffusers", lineliffusersRouter);

app.get("/hello", (req, res, next)=>{
  console.info("GET /hello success");
  res.send("Welcome to firebase functions with Node Express");
});

app.post("/emailValidate", (req, res, next)=>{
  const postData = req.body;
  if (postData.email) {
    console.info("POST /emailValidate success");
    res.json({"status": validator.validate(postData.email)});
  } else {
    console.info("POST /emailValidate wrong input");
    res.status(500).json({"status": "Wrong request input"});
  }
});

app.listen(PORT, ()=>{
  console.log("Server is running on PORt", PORT);
});

exports.app = functions.https.onRequest(app);
