//  const functions = require('firebase-functions');
//  const cors = require("cors")({ origin: true });

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));


app.post('/', async (req, res) => {
    const snapshot = await admin.firestore().collection('openingHours').get();
    let openingHours = [];
    snapshot.forEach(doc => {
      let id = doc.id;
      let data = doc.data();
      openingHours.push({id, ...data});
    });
 res.status(201).send(JSON.stringify(openingHours));
   });

  app.get('/', async (req, res) => {
    const snapshot = await admin.firestore().collection('openingHours').get();
    let openingHours = [];
    snapshot.forEach(doc => {
      let id = doc.id;
      let data = doc.data();
      openingHours.push({id, ...data});
    });
    res.status(200).send(JSON.stringify(openingHours));
  });

  app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('openingHours').doc(req.params.id).get();
    const openingHoursId = snapshot.id;
    const openingHoursData = snapshot.data();
    res.status(200).send(JSON.stringify({id: openingHoursId, ...openingHoursData}));
  });

  exports.openingHours= functions.https.onRequest(app);


// // http request 1
// exports.randomNumber = functions.https.onRequest((request, response) => {
//     // cors(request, response, () => {
//     //     if (req.method !== "POST") {
//     //       return res.status(500).json({
//     //         message: "Not allowed"
//     //       });
//     //     }
//     // });
//     const number = Math.round(Math.random()* 100);
//     console.log(number);
//     response.send(number.toString()); 
// })

// // http request 2
// exports.redirector = functions.https.onRequest((request, response) => {
//     response.redirect('https://www.amazon.com');
// })




