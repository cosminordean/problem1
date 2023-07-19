const expect = require("chai").expect;
const chai = require("chai");
const assert = require("assert");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const {
  listDirectory,
  getFiles,
  processTree,
  processOutputTexts,
} = require("../src/helpers/os");

let expectedExample1 = `root.prog
    ex1.lib
`;

describe("My Tests", function () {
  it("check directory listing", async function () {
    const directoriesArray = await listDirectory("examples");
    expect(directoriesArray).to.eql(["example1", "example2", "example3"]);
  });

  it("check directory listing without input dir", async function () {
    await expect(listDirectory()).to.be.rejectedWith(
      "Please provide a valid `startPath` parameter."
    );
  });

  it("should list files inside a directory", async function () {
    const files = await getFiles("examples", "example1");
    expect(files).to.eql(["example1\\ex1.lib", "example1\\root.prog"]);
  });

  it("should transform an array of file paths into a tree and check output texts", async function () {
    const files = await getFiles("examples", "example1");
    let r = await processTree(files);
    expect(r).to.eql([
      {
        name: "example1",
        children: [
          { name: "root.prog", children: [], place: 1 },
          { name: "ex1.lib", children: [], place: 1 },
        ],
        place: 0,
      },
    ]);

    const text = processOutputTexts(r);
    expect(text).to.equal(expectedExample1);
  });
});
