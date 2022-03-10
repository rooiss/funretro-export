const path = require('path');
const fs = require('fs');

module.exports.writeToFile = function (filePath, data) {
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
};
