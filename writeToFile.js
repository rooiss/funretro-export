const path = require('path');
const fs = require('fs');

module.exports.writeToFile = function (
  filePath,
  { boardTitle, content },
  formatOption
) {
  let extension;
  if (formatOption === 'markdown') {
    extension = 'txt';
  } else if (formatOption === 'csv') {
    extension = 'csv';
  }
  const resolvedPath = path.resolve(
    filePath ||
      `../${boardTitle.replace(/\//g, '').replace(/\s/g, '_')}.${extension}`
  );
  fs.writeFile(resolvedPath, content, (error) => {
    if (error) {
      throw error;
    } else {
      console.info(`Successfully written to file at: ${resolvedPath}`);
    }
    process.exit();
  });
};
