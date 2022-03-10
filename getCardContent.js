require('playwright');
const { getInnerText } = require('./getInnerText');

module.exports.getCardContent = async function (lists) {
  const resArr = await getListData(lists);
  return resArr;
};

const getListData = async (lists) => {
  const result = [];

  for (let col = 0; col < lists.length; col++) {
    const listData = {};
    listData.section = await getListTitle(lists[col]);
    listData.cards = await getListCards(lists[col]);
    result.push(listData);
  }
  return result;
};

const getListCards = async (list) => {
  const cards = await list.$$('.column > li');
  const result = [];
  for (let row = 0; row < cards.length; row++) {
    const cardMeta = {};
    cardMeta.text = await getCardText(cards[row]);
    cardMeta.votes = await getCardVotes(cards[row]);
    result.push(cardMeta);
  }
  return result;
};

const getListTitle = async (list) => {
  return await list.$eval('.column-header > h2', getInnerText);
};
const getCardText = async (card) => {
  return await card.$eval('.easy-card-body .text', getInnerText);
};
const getCardVotes = async (card) => {
  const voteString = await card.$eval(
    '.easy-card-votes-container span.easy-badge-votes',
    getInnerText
  );
  return parseInt(voteString);
};

// for (let col = 0; col < columns.length; col++) {
// const columnTitle = await columns[col].$eval(
//   '.column-header > h2',
//   getInnerText
// );
// resArr.push(columnTitle);
// const card = await columns[col].$$('.column > li');
// if (card.length) {
//   parsedText += `## ${columnTitle}\n`;
// }
// console.log('column', col);
// for (let row = 0; row < card.length; row++) {
// const cardText = await card[row].$eval(
//   '.easy-card-body .text',
//   getInnerText
// );
// console.log(cardText, 'row', row);
// const votesCount = await card[row].$eval(
//   '.easy-card-votes-container span.easy-badge-votes',
//   getInnerText
// );
// const votesCountText = votesCount > 0 ? `(+${votesCount})` : '';

// let commentsCount = 0;

// try {
//   commentsCount = await card[row].$eval(
//     '[aria-label="New comment"] .easy-badge-votes',
//     getInnerText
//   );
// } catch {
//   // TODO: Review comments selector
// }
// if (Number(commentsCount) > 0) {
//   await card[row].$eval('[aria-label="New comment"]', (node) =>
//     node.click()
//   );
//   const comments = await card[i].$$('.comment');
//   if (comments.length) {
//     for (let i = 0; i < comments.length; i++) {
//       const commentText = await comments[i].$eval(
//         '.comment .text',
//         getInnerText
//       );
// parsedText += `\t- ${commentText}\n`;
//     }
//   }
// }
// resArr.push({ cardText, votesCount, commentsCount, col, row });
// }
// if (card.length) {
//   parsedText += '\n';
// }
// }
// console.log(resArr);
