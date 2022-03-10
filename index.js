const { chromium } = require('playwright');
const { format } = require('./format');
const { getCardContent } = require('./getCardContent');
const { getInnerText } = require('./getInnerText');
const { writeToFile } = require('./writeToFile');

const DEFAULT_FORMAT = 'csv';

// extract CLI args
const [url, file, _formatOption] = process.argv.slice(2);

const formatOption = _formatOption ? _formatOption.trim() : DEFAULT_FORMAT;

if (!url) {
  handleError('Please provide a URL as the first argument.');
}

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.easy-board');
  await page.waitForSelector('.board-name');

  const boardTitle = await page.$eval('.board-name', getInnerText);

  if (!boardTitle) {
    handleError(
      'Board title does not exist. Please check if provided URL is correct.'
    );
  }

  // get the 3 lists
  const lists = await page.$$('.easy-card-list');

  // extract data from DOM
  const cardContent = await getCardContent(lists);

  return format(formatOption, cardContent);
}

function handleError(error) {
  throw new Error(error);
}

run()
  .then((data) => {
    writeToFile(file, data);
  })
  .catch(handleError);
