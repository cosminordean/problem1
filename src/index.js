const {
  listDirectory,
  getFiles,
  processOutputTexts,
} = require("./helpers/os");
const path = require("node:path");

var argv = require("minimist")(process.argv.slice(2));

if (!argv.s) {
  const msg =
    "Please provide `-s` param as a path. e.g. `node src/index -s [DIR_NAME]`";
  console.error(msg);
  return;
}

(async (startPath) => {
  try {
    let normalizePath = path.normalize(startPath);
    const directoriesArray = await listDirectory(normalizePath);

    for (const dir of directoriesArray) {
      let files = [];

      if (normalizePath.split(path.sep).length === 1) {
        files = await getFiles(normalizePath, dir);
        console.log(processOutputTexts(files));
      } else {
        throw new Error(
          "Please run with like so: `node src/index -s [DIR_NAME]`"
        );
      }
    }
  } catch (e) {
    // TODO - Log error
    console.error(`Something went wrong :: ${e.message}`);
  }

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
})(argv.s); // program starts here with the argument passed in `-s`
