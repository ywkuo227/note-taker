// Require FS and Util modules.
const fs = require("fs");
const util = require("util");

// Function to read data from specified file. Promise version of fs.readFile.
const readFromFile = util.promisify(fs.readFile);

// Function to write specified content to designated file. The function also prettify the designated file during JSON.stringify process.
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`Change saved to ${destination}\n`)
    }
  });
};

// Function to read data from a specified file and append content before writing back to the file.
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
      console.log(`New note entry (ID: ${content.id}) added to notes.`)
    }
  });
};

// Function to read data from a specified file and delete the content with matching ID before writing back to the file.
const deleteAndWrite = (idToDel, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      for (let i = 0; i < parsedData.length; i++) {
        if (idToDel === parsedData[i].id) {
          parsedData.splice(i, 1);
          writeToFile(file, parsedData);
          console.log(`Note entry ID: ${idToDel} removed from notes.`)
        }
      }
    }
  });
};

module.exports = { readFromFile, readAndAppend, deleteAndWrite };