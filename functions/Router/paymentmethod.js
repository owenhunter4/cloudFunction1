const express = require("express");
const router = new express.Router();
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const colletion = "paymentmethod";


//  Check service status
router.get("/status", (req, res) => res.send("OK"));

router.get("/", async (req, res) => {
  const snapshot = await db.collection(colletion).get();
  const entities = [];
  snapshot.forEach((doc) => {
    entities.push(doc.data());
  });
  res.json({
    results: entities,
    count: entities.length,
  });
});

router.post("/", async (req, res) => {
  const data = {...req.body};
  const addRequest = await db.collection(colletion).add(data);
  console.log(addRequest);
  res.json({
    status: "OK",
    data: {
      data,
      id: addRequest.id,
    },
  });
});

router.put("/:id", async (req, res) => {
  const {
    params,
  } = req;
  const {
    id,
  } = params;

  const data = {...req.body};
  const docRef = await db.collection(colletion).doc(id);
  const updateRequest = await docRef.update({...data});
  console.log(updateRequest);
  const doc = await docRef.get();
  res.json({
    status: "OK",
    data: doc.data(),
  });
});

router.delete("/:id", async (req, res) => {
  const {
    params,
  } = req;
  const {
    id,
  } = params;

  const data = {...req.body};
  console.log(data.length);

  const docRef = await db.collection(colletion).doc(id);
  const updateRequest = await docRef.delete();
  console.log(updateRequest);
  res.sendStatus(204);
});

module.exports = router;
