const { formatCsv } = require('./formatCsv');
const { formatMarkdown } = require('./formatMarkdown');

module.exports.format = function (format, lists) {
  if (format === 'csv') {
    const csvFile = formatCsv(lists);
    return csvFile;
  }
  if (format === 'markdown') {
    const mdFile = formatMarkdown(lists);
    return mdFile;
  }
};
