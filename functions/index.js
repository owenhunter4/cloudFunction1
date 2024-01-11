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

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/hello", (req, res, next)=>{
  res.send("Welcome to firebase functions with Node Express");
});

app.post("/emailValidate", (req, res, next)=>{
  const postData = req.body;
  if (postData.email) {
    res.json({"status": validator.validate(postData.email)});
  } else {
    res.status(500).json({"status": "Wrong request input"});
  }
});

app.listen(PORT, ()=>{
  console.log("Server is running on PORt", PORT);
});

exports.app = functions.https.onRequest(app);
