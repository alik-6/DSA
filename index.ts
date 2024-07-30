import * as fs from "fs";
import * as path from "path";

function processDirectory(directoryPath: string, outputFilePath: string) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}: ${err}`);
      return;
    }

    files.forEach(async (file) => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error stating file ${filePath}: ${err}`);
          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath, outputFilePath);
        } else if (stats.isFile()) {
          processFile(filePath, outputFilePath);
        }
      });
    });
  });
}

function processFile(filePath: string, outputFilePath: string) {
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.error(`Error reading file ${filePath}: ${err}`);
      return;
    }

    const basePath = path.dirname(filePath);
    const entry = `-- ${filePath}\nBase Path: ${basePath}\nContent:\n${fileContent}\n\n`;

    fs.appendFile(outputFilePath, entry, (err) => {
      if (err) {
        console.error(
          `Error appending to output file ${outputFilePath}: ${err}`
        );
        return;
      }

      console.log(`Processed file: ${filePath}`);
    });
  });
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error(
      "Usage: ts-node appendBasePathToFile.ts <directoryPath> <outputFilePath>"
    );
    process.exit(1);
  }

  const directoryPath = args[0];
  const outputFilePath = args[1];

  fs.writeFile(outputFilePath, "", (err) => {
    if (err) {
      console.error(`Error clearing output file ${outputFilePath}: ${err}`);
      process.exit(1);
    }

    processDirectory(directoryPath, outputFilePath);
  });
}

main();
