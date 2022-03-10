const { formatCsv } = require('./formatCsv');
const { formatMarkdown } = require('./formatMarkdown');

module.exports.format = function (format, cardsArr) {
  if (format === 'csv') {
    const csvFile = formatCsv(cardsArr);
    // return csvFile;
  }
  if (format === 'markdown') {
    const mdFile = formatMarkdown(cardsArr);
    return mdFile;
  }
};
