# Coding Challenge: Imports in Domain Specific Language

This is a coding challenge


## Installation

#### Prerequisites

- [x] Node JS: v16.19.0 or better (more info [on nodejs page](https://nodejs.org/en/download/))
- [x] GIT - Install based on the target platform.


#### Start Local Local Development

Clone repo:
```bash
$ git clone <GIT_REPO_URL> challange
```


Install dependencies:
```bash
$ cd challange
# install packages
$ npm install
```

Start :

```bash
$ npm run dev
```

Output:
```bash
$ npm run dev

> challange@1.0.0 dev
> node src/index.js -s examples

root.prog
    ex1.lib

root.prog
    ex1.lib
    ex2.lib

root.prog
    ex1.lib
    ex2.lib
        ex3.lib

The script uses approximately 4.71 MB
```

Test:

```bash
$ npm run test
```

Output:

```bash
$ npm run test

> challange@1.0.0 test
> mocha --reporter spec



  My Tests
    √ check directory listing
    √ check directory listing without input dir
    √ should list files inside a directory
    √ should transform an array of file paths into a tree and check output texts


  4 passing (9ms)
```
