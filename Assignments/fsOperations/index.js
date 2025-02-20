const fs = require("fs");
//const { text } = require("stream/consumers");
const yargs = require("yargs");

const argv = yargs
  .option("file", {
    alias: "f",
    description: "Name of the file",
    type: "string",
  })
  .demandOption(["file"], "Please provide the file name to proceed").argv;

const fileName = argv.file;
const fileArrayPath = "filename.txt";

const readFileNames = () => {
  try {
    return fs.readFileSync(fileArrayPath, "utf8").split("\n").filter(Boolean);
  } catch (e) {
    return [];
  }
};

const fileExists = (name, fileList) => {
  return fileList.includes(name);
};

const writeTextToFile = (filleName, text) => {
  fs.writeFileSync(filleName, text, "utf-8");
};

const appendFileName = (file, name) => {
  fs.appendFileSync(file, name + "\n", "utf-8");
};

const filesList = readFileNames();

if (fileExists(fileName, filesList)) {
  console.log("File already exists, please provide a different name.");
} else {
  writeTextToFile(fileName, "You are awesome.");
  appendFileName(fileArrayPath, fileName);
  console.log(`File ${fileName} created and updated file list successfully.`);
}
