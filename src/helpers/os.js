const { readdir } = require("fs").promises;
const path = require("node:path");

let nbOfSpaces = 4;

/**
 * List Directory Contents without file types
 *
 * @param  {String} startPath Start Directory
 * @return {Promise} Promise array with all directories
 */
async function getDirectoryContents(startPath = "") {
  if (startPath === "") {
    throw new Error("Please provide a valid `startPath` parameter.");
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
      if (item.name === "root.prog") {
        files.unshift(`${dirName}\\${item.name}`);
      } else {
        files.push(`${dirName}\\${item.name}`);
      }
    }
  }

  // sort array of paths based on their path length
  return files.sort((a, b) => a.split("\\").length - b.split("\\").length);
}

/**
 * Check if array of path has space deviation
 *
 * @param {Array} arr Array of spaces
 * @returns { Object }
 */
function checkSpaceDeviation(arr) {
  let needs = {
    flag: false,
    next: null,
    where: null,
    others: [],
  };

  for (i = 0; i <= Math.max(...arr); i += nbOfSpaces) {
    let idx = arr.indexOf(i + nbOfSpaces);
    if (idx === -1) {
      needs.flag = true;
      needs.where = i + nbOfSpaces;
      needs.next = i + nbOfSpaces + nbOfSpaces;

      arr.forEach((a) => {
        if (a >= needs.next) {
          needs.others.push(a);
        }
      });
      return needs;
    }
  }

  return needs;
}

/**
 * ProcessOutputTexts function used to build the output formatted
 * strings with whitespace
 *
 * @param {Array} listOfFilesArray This is an array sorted by path depth.
 * @returns String
 */
function processOutputTexts(listOfFilesArray = []) {
  let outs = [];
  let prevPath = "";
  let out = "";
  let sp = [];
  let r = new RegExp("root*");

  for (let p of listOfFilesArray) {
    if (r.test(p)) {
      sp.push(nbOfSpaces);
    } else {
      let v = p.substr(0, p.lastIndexOf("\\")).split("\\").length * nbOfSpaces;
      if (
        v === nbOfSpaces &&
        p.substr(0, p.lastIndexOf("\\")).split("\\").length === 1
      ) {
        sp.push(v + nbOfSpaces);
      } else {
        sp.push(v + nbOfSpaces);
      }
    }
  }

  for (let part of listOfFilesArray) {
    let file = path.basename(part);
    prevPath = part.substr(0, part.lastIndexOf("\\"));
    let r = new RegExp("root*");
    if (r.test(file)) {
      outs.push("    root.prog");
    } else {
      let calculatedSpace = part.split("\\").length * nbOfSpaces;
      outs.push(
        part
          .replace(prevPath, new Array(calculatedSpace + 1).join(" "))
          .replace("\\", "")
      );
    }
  }

  // check space deviation
  let { flag, where, next, others } = checkSpaceDeviation(sp);
  if (flag) {
    for (let i = 0; i < sp.length; i++) {
      if (sp[i] === next) {
        sp[i] = where;
      } else {
        if (others.includes(sp[i])) {
          sp[i] = sp[i] - nbOfSpaces;
        }
      }
    }
  }
  // compose output
  for (let i = 0; i < sp.length; i++) {
    let actualText = outs[i].trim();
    out += `${actualText.padStart(actualText.length + sp[i])}\n`;
  }

  return out;
}

module.exports = {
  listDirectory: getDirectoryContents,
  getFiles,
  processOutputTexts
};
