const expect = require("chai").expect;
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const {
  listDirectory,
  getFiles,
  processOutputTexts,
} = require("../src/helpers/os");

let expectedExample1 = `    root.prog
        ex1.lib
`;
let expectedExample2 = `    root.prog
        ex1.lib
        ex2.lib
`;

let expectedExample3 = `    root.prog
        ex1.lib
        ex2.lib
            ex3.lib
            ex4.lib
                ex5.lib
`;

let expectedExample4 = `    root.prog
        ex1.lib
        ex2.lib
            ex3.lib
`;

let expectedExample5 = `    root.prog
        ex1.lib
        ex2.lib
            ex3.lib
                ex4.lib
`;

describe("My Tests", function () {
  it("check directory listing", async function () {
    const directoriesArray = await listDirectory("examples");
    expect(directoriesArray).to.eql(["example1", "example2", "example3", "example4", "example5"]);
  });

  it("check directory listing without input dir", async function () {
    await expect(listDirectory()).to.be.rejectedWith(
      "Please provide a valid `startPath` parameter."
    );
  });

  it("should list files inside a directory", async function () {
    const files = await getFiles("examples", "example1");
    expect(files).to.eql(["example1\\root.prog", "example1\\ex1.lib"]);
  });

  it(`test example 1 to be: \n ${expectedExample1}`, async function () {
    const files = await getFiles("examples", "example1");
    let text = await processOutputTexts(files);

    expect(text).to.equal(expectedExample1);
  });

  it(`test example 2 to be: \n ${expectedExample2}`, async function () {
    const files = await getFiles("examples", "example2");
    let text = await processOutputTexts(files);

    expect(text).to.equal(expectedExample2);
  });

  it(`test example 3 to be: \n ${expectedExample3}`, async function () {
    const files = await getFiles("examples", "example3");
    let text = await processOutputTexts(files);

    expect(text).to.equal(expectedExample3);
  });

  it(`test example 4 to be: \n ${expectedExample4}`, async function () {
    const files = await getFiles("examples", "example4");
    let text = await processOutputTexts(files);

    expect(text).to.equal(expectedExample4);
  });

  it(`test example 5 to be: \n ${expectedExample5}`, async function () {
    const files = await getFiles("examples", "example5");
    let text = await processOutputTexts(files);

    expect(text).to.equal(expectedExample5);
  });
});
