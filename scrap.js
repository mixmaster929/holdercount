const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.get("/getHolderCount", async (req, res) => {
  const { tokeAddress } = req.query;

  if (!tokeAddress) {
    return res.status(400).send({ error: "tokeAddress is required" });
  }

  const tokenUrl = `https://etherscan.io/token/${tokeAddress}`;
  const holdersCount = await scrapeTokenHolders(tokenUrl); // Await here
  res.send({ holdersCount });
});

app.get("/", (req, res) => {
  res.send("Hello from Node API!");
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

async function scrapeTokenHolders(url) {
  let holdersCount = 0;
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
      },
    });
    const $ = cheerio.load(data);
    const holdersElement = $(".d-flex.flex-wrap.gap-2 div").first();

    if (!holdersElement.length) {
      console.error("No holders element found.");
      return 0;  // No holders found; return a default value
    }
    const holdersText = holdersElement.text().trim();
    holdersCount = holdersText.split(" ")[0].replace(/,/g, "");
    console.log(`Token Holders: ${holdersCount}`);
    return holdersCount;
  } catch (error) {
    console.error("Error fetching data:", error);
    return 0;
  }
}