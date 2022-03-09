const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// adding format as an option to CLI arg
const [url, file, format] = process.argv.slice(3);

if (!url) {
  throw 'Please provide a URL as the first argument.';
}

let boardTitle = '';

const getInnerText = (node) => node.innerText.trim();

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

  let resArr = [];

  // get all columns
  const columns = await page.$$('.easy-card-list');

  for (let col = 0; col < columns.length; col++) {
    const columnTitle = await columns[col].$eval(
      '.column-header > h2',
      getInnerText
    );

    // get all cards
    const card = await columns[col].$$('.column > li');

    for (let i = 0; i < card.length; i++) {
      const messageText = await card[i].$eval(
        '.easy-card-body .text',
        getInnerText
      );
      console.log(messageText, i);
      const votesCount = await card[
        i
      ].$eval('.easy-card-votes-container span.easy-badge-votes', (node) =>
        node.innerText.trim()
      );
      const votesCountText = votesCount > 0 ? `(+${votesCount})` : '';
      parsedText += `- ${messageText} ${votesCountText}\n`;

      let commentsCount = 0;

      try {
        commentsCount = await card[i].$eval(
          '[aria-label="New comment"] .easy-badge-votes',
          getInnerText
        );
      } catch {
        // TODO: Review comments selector
      }
      if (Number(commentsCount) > 0) {
        await messages[row].$eval('[aria-label="New comment"]', (node) =>
          node.click()
        );
        const comments = await messages[i].$$('.comment');
        if (comments.length) {
          for (let i = 0; i < comments.length; i++) {
            const commentText = await comments[i].$eval(
              '.comment .text',
              getInnerText
            );
            parsedText += `\t- ${commentText}\n`;
          }
        }
      }
    }
    resArr.push({ messageText, votesCount, commentsCount, col, row });
    if (card.length) {
      parsedText += '\n';
    }
  }

  return parsedText;
}

function parseFormat(format) {}

function writeToFile(filePath, data) {
  const datetime = new Date();
  const resolvedPath = path.resolve(
    filePath ||
      `../${boardTitle.replace('/', '')}-${datetime
        .toISOString()
        .slice(0, 10)}.csv`
  );
  fs.writeFile(resolvedPath, data, (error) => {
    if (error) {
      throw error;
    } else {
      console.info(`Successfully written to file at: ${resolvedPath}`);
    }
    process.exit();
  });
}

function handleError(error) {
  console.error(error);
}

run()
  .then((data) => writeToFile(file, data))
  .catch(handleError);
