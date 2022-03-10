module.exports.formatCsv = function (cardsArr) {
  let csv = [];
  const headers = cardsArr.map((obj) => obj.section);
  csv.push(headers);
  const maxRows = findMaxRows(cardsArr);
  csv = insertRows(csv, maxRows);
  // console.log('csv row 1 column stop', typeof csv[1][1]);
  // iterating through sections

  const cards = cardsArr.map((obj) => obj.cards.map((cards) => cards));
  for (let i = 0; i < csv.length; i++) {
    let csvPointer = 1;
    for (let j = 0; j < maxRows; j++) {
      let row = cards[j];
      if (!row[j]) {
        csv[csvPointer].push(',');
      } else {
        csv[csvPointer].push(row[j].text);
      }
    }
    csvPointer++;
  }
  // console.log(csv);
  // for (let i = 0; i < cards.length; i++) {
  //   let csvPointer = 1;
  //   for (let j = 0; j < cards[i].length; j++) {
  //     console.log(csvPointer);
  //     if (csvPointer > cards[i].length) {
  //       break;
  //     }
  //     if (!cards[i][j]) {
  //       csv[csvPointer].push(',');
  //     } else {
  //       csv[csvPointer].push(cards[i][j].text);
  //     }
  //     csvPointer++;
  //   }
  //   // console.log(csv[i]);
  // }
  // console.log(csv);
  // for (let i = 0; i < cardsArr[i].cards.length; i++) {
  //   // iterate through all the cards in the section
  //   for (let j = 0; j < maxRows; j++) {
  //     console.log(cardsArr[i].cards[0]);
  //     if (cardsArr[i].cards) {
  //       csv[i].push(',');
  //     } else {
  //       csv[i].push(`${cardsArr[i].cards[j].text},`);
  //     }
  //   }
  // }
  // console.log(csv);
};

const findMaxRows = (cardsArr) => {
  let max = 0;
  for (let i = 0; i < cardsArr.length; i++) {
    max = Math.max(cardsArr[i].cards.length, max);
  }
  return max;
};

const insertRows = (csv, rowMax) => {
  for (let i = 0; i < rowMax; i++) {
    csv.push([]);
  }
  return csv;
};
