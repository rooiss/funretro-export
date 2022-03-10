const { chromium } = require('playwright');
const { format } = require('./format');
const { getCardContent } = require('./getCardContent');
const { getInnerText } = require('./getInnerText');
const { writeToFile } = require('./writeToFile');

// adding format as an option to CLI arg
const [url, file, formatOption] = process.argv.slice(2);

if (!url) {
  throw 'Please provide a URL as the first argument.';
}

let boardTitle = '';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.easy-board');
  await page.waitForSelector('.board-name');

  boardTitle = await page.$eval('.board-name', getInnerText);

  if (!boardTitle) {
    throw 'Board title does not exist. Please check if provided URL is correct.';
  }

  // iterate through each lane, create a laneMeta object for each
  // const lanes = await getLaneMetas(columns)

  const columns = await page.$$('.easy-card-list');

  const cardsArr = await getCardContent(columns);
  format('csv', cardsArr);

  // console.log(cardsArr);
  // return the data
}

function handleError(error) {
  console.error(error);
}

run()
  .then((data) => {
    // writeToFile(file, data)
    console.log('something');
  })
  .catch(handleError);
