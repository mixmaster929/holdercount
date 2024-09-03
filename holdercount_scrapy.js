const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTokenHolders(url) {
  let holdersCount = 0;
  try {
    // Fetch the HTML of the page
    const { data } = await axios.get(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(data);

    // Select the div element containing the holders count
    const holdersElement = $('.d-flex.flex-wrap.gap-2 div').first();

    // Get the text content and parse the number of holders
    const holdersText = holdersElement.text().trim();
    holdersCount = holdersText.split(' ')[0].replace(/,/g, '');

    console.log(`Token Holders: ${holdersCount}`); // Output the number of holders
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const tokenUrl1 = 'https://etherscan.io/token/0xb9f599ce614feb2e1bbe58f180f370d05b39344e';
const tokenUrl2 = 'https://etherscan.io/token/0x8aa9381b2544b48c26f3b850f6e07e2c5161eb3e';
const tokenUrl3 = 'https://etherscan.io/token/0xEE2a03Aa6Dacf51C18679C516ad5283d8E7C2637';
const tokenUrl4 = 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7';
const tokenUrl5 = 'https://etherscan.io/token/0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4';
const tokenUrl6 = 'https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f';
const tokenUrl7 = 'https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca';
const tokenUrl8 = 'https://etherscan.io/token/0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce';
const tokenUrl9 = 'https://etherscan.io/token/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0';
const tokenUrl10 = 'https://etherscan.io/token/0x6982508145454ce325ddbe47a25d4ec3d2311933';

const token100 = 'https://etherscan.io/token/0x576e2bed8f7b46d34016198911cdf9886f78bea7';
// scrapeTokenHolders(tokenUrl1);
// scrapeTokenHolders(tokenUrl2);
scrapeTokenHolders(tokenUrl3);
// scrapeTokenHolders(tokenUrl4);
// scrapeTokenHolders(tokenUrl5);
// scrapeTokenHolders(tokenUrl6);
// scrapeTokenHolders(tokenUrl7);
// scrapeTokenHolders(tokenUrl8);
// scrapeTokenHolders(tokenUrl9);
// scrapeTokenHolders(tokenUrl10);

// scrapeTokenHolders(token100);