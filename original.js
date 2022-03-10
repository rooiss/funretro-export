const { chromium } = require('playwright');
const { writeToFile } = require('./writeToFile');

// adding format as an option to CLI arg
const [url, file, format] = process.argv.slice(2);

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

  let parsedText = `# ${boardTitle}\n\n`;

  const resArr = [];

  const columns = await page.$$('.easy-card-list');

  for (let col = 0; col < columns.length; col++) {
    const columnTitle = await columns[col].$eval(
      '.column-header > h2',
      getInnerText
    );

    const card = await columns[col].$$('.column > li');
    if (card.length) {
      parsedText += `## ${columnTitle}\n`;
    }
    console.log('column', col);
    for (let row = 0; row < card.length; row++) {
      const cardText = await card[row].$eval(
        '.easy-card-body .text',
        getInnerText
      );
      console.log(cardText, 'row', row);
      const votesCount = await card[
        row
      ].$eval('.easy-card-votes-container span.easy-badge-votes', (node) =>
        node.innerText.trim()
      );
      const votesCountText = votesCount > 0 ? `(+${votesCount})` : '';
      parsedText += `- ${cardText} ${votesCountText}\n`;

      let commentsCount = 0;

      try {
        commentsCount = await card[row].$eval(
          '[aria-label="New comment"] .easy-badge-votes',
          getInnerText
        );
      } catch {
        // TODO: Review comments selector
      }
      if (Number(commentsCount) > 0) {
        await card[row].$eval('[aria-label="New comment"]', (node) =>
          node.click()
        );
        const comments = await card[i].$$('.comment');
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
      resArr.push({ cardText, votesCount, commentsCount, col, row });
    }
    if (card.length) {
      parsedText += '\n';
    }
  }

  console.log(resArr);
  return parsedText;
}

function handleError(error) {
  console.error(error);
}

run()
  .then((data) => writeToFile(file, data))
  .catch(handleError);
