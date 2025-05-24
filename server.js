const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// Your MTN MoMo details
const MOMO_API_KEY = "YOUR_API_KEY";
const MOMO_SUBSCRIPTION_KEY = "YOUR_SUBSCRIPTION_KEY";
const MOMO_USER_ID = "YOUR_USER_ID";
const MOMO_BASE_URL = "https://sandbox.momodeveloper.mtn.com";
const COLLECTION_URL = MOMO_BASE_URL + "/collection/v1_0/requesttopay";
const TARGET_ENV = "sandbox"; // Change to "production" if live

app.post("/api/pay", async (req, res) => {
  const { phone, amount } = req.body;
  const transactionId = uuidv4();

  try {
    // Get access token
    const tokenRes = await axios.post(`${MOMO_BASE_URL}/collection/token/`, null, {
      headers: {
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        "Authorization": "Basic " + Buffer.from(`${MOMO_USER_ID}:${MOMO_API_KEY}`).toString("base64")
      }
    });

    const accessToken = tokenRes.data.access_token;

    // Send payment request
    await axios.post(COLLECTION_URL, {
      amount: amount.toString(),
      currency: "RWF",
      externalId: transactionId,
      payer: {
        partyIdType: "MSISDN",
        partyId: phone.replace("+", "")
      },
      payerMessage: "Orpcare Application Fee",
      payeeNote: "Application Fee"
    }, {
      headers: {
        "X-Reference-Id": transactionId,
        "X-Target-Environment": TARGET_ENV,
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ success: true, transactionId });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Payment request failed." });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
