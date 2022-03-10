require('playwright');
const { getInnerText } = require('./getInnerText');

module.exports.getCardContent = async function (lists) {
  const result = await getListData(lists);
  return result;
};

const getListData = async (lists) => {
  return Promise.all(
    lists.map(async (list) => {
      const listData = {};
      listData.section = await getListTitle(list);
      listData.cards = await getListCards(list);
      return listData;
    })
  );
};

const getListCards = async (list) => {
  const cards = await list.$$('.column > li');
  return Promise.all(
    cards.map(async (card) => {
      const cardData = {};
      cardData.text = await getCardText(card);
      cardData.votes = await getCardVotes(card);
      return cardData;
    })
  );
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
