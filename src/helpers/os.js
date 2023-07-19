const { readdir } = require("fs").promises;
const path = require("node:path");

let nbOfSpaces = 4;

/**
 * List Directory Contents without file types
 *
 * @param  {String} startPath Start Directory
 * @return {Promise} Promise array with all directories
 */
async function getDirectoryContents(startPath = '') {
  if (startPath === '') {
    throw new Error('Please provide a valid `startPath` parameter.');
  }

  return readdir(startPath, { withFileTypes: false });
}

/**
 *
 * @param {*} parent Parent Directory
 * @param {*} dirName Current Direactory
 * @returns {Promise} Promise containing array with all the files paths
 */
async function getFiles(parent, dirName) {
  let files = [];

  const fullpath = path.join(parent, dirName);
  const items = await readdir(fullpath, {
    withFileTypes: true,
    recursive: true,
  });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...(await getFiles(parent, `${dirName}\\${item.name}`)),
      ];
    } else {
      files.push(`${dirName}\\${item.name}`);
    }
  }

  return files;
}

/**
 * Function to create a tree with childrens
 *
 * @param {Array} paths Contains an array of file paths
 * @returns An array of objects with children and levels
 */
async function buildTree(paths) {
  result = [];
  let level = { result };

  paths.forEach((path) => {
    path.split("\\").reduce((r, name, i) => {
      if (!r[name]) {
        r[name] = { result: [] };
        if (name === "root.prog") {
          r.result.unshift({
            name,
            children: r[name].result,
            place: 1,
          });
        } else {
          r.result.push({
            name,
            children: r[name].result,
            place: i,
          });
        }
      }

      return r[name];
    }, level);
  });

  return result;
}

/**
 * ProcessOutputTexts function used to build the output formatted
 * strings with whitespace
 *
 * @param {*} item
 * @param {*} nextLevel
 * @returns String
 */
function processOutputTexts(item, nextLevel = 1) {
  let out = '';
  let level = nextLevel || 1;

  for (const part of item) {
    if (level === 1) {
      // out += `----------- ${part.name} -----------\n`;
    }

    if (part.children.length === 0) {
      if (part.name === "root.prog") {
        out += `${part.name.padStart(part.name.length)}\n`;
      } else {
        out += `${part.name.padStart(
          part.name.length + nbOfSpaces * part.place
        )}\n`;
      }
    } else {
      out += processOutputTexts(part.children, level + 1);
    }
  }

  return out;
}

module.exports = {
  listDirectory: getDirectoryContents,
  getFiles,
  processTree: buildTree,
  processOutputTexts,
};
