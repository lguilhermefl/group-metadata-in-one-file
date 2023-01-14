import * as fs from "fs";
import * as path from "path";

const filesCount = fs.readdirSync("metadata").length;
const groupedMetadata = [];

function groupMetadata() {
  for (let i = 1; i <= filesCount; i++) {
    const fileName = `${i}.json`;
    const metadataFolderPath = path.resolve("metadata", fileName);

    fs.readFile(metadataFolderPath, "utf-8", (err, data) => {
      const dataObject = JSON.parse(data);
      groupedMetadata.push(dataObject);
      if (groupedMetadata.length == filesCount) {
        const orderedMetadata = groupedMetadata.sort(
          (a, b) => a.edition - b.edition
        );

        fs.writeFileSync(
          "metadata.json",
          JSON.stringify(orderedMetadata, null, 2)
        );
      }
    });
  }
}

groupMetadata();
