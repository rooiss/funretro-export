const { chromium } = require('playwright');
const { format } = require('./format');
const { getCardContent } = require('./getCardContent');
const { getInnerText } = require('./getInnerText');
const { writeToFile } = require('./writeToFile');

const DEFAULT_FORMAT = 'csv';
const ACCEPTED_FORMATS = ['csv', 'markdown'];

// extract CLI args
const [url, file, _formatOption] = process.argv.slice(2);
const formatOption = _formatOption ? _formatOption.trim() : DEFAULT_FORMAT;

if (!ACCEPTED_FORMATS.includes(formatOption)) {
  handleError(
    `Invalid format specified. Accepted formats: ${ACCEPTED_FORMATS.join(',')}`
  );
}

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
  const listElements = await page.$$('.easy-card-list');

  // extract data from DOM
  const lists = await getCardContent(listElements);
  const boardData = { boardTitle, lists };

  return {
    content: format(formatOption, boardData),
    boardTitle,
  };
}

function handleError(error) {
  throw new Error(error);
}

run()
  .then((data) => {
    writeToFile(file, data, formatOption);
  })
  .catch(handleError);
