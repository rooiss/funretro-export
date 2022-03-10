const HEADERS = ['list', 'text', 'votes'];
module.exports.formatCsv = function ({ lists }) {
  const csv = [];
  csv.push(HEADERS);
  lists.forEach((list) => {
    list.cards.forEach((card) => {
      if (card.votes > 0) {
        csv.push([list.section, card.text, card.votes]);
      }
    });
  });
  return csv.map((row) => row.join(',')).join('\n');
};

// const findMaxRows = (cardsArr) => {
//   let max = 0;
//   for (let i = 0; i < cardsArr.length; i++) {
//     max = Math.max(cardsArr[i].cards.length, max);
//   }
//   return max;
// };

// const insertRows = (csv, rowMax) => {
//   for (let i = 0; i < rowMax; i++) {
//     csv.push([]);
//   }
//   return csv;
// };
