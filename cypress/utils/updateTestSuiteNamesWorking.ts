import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';

async function updateTestSuiteNames(directoryPath: string): Promise<void> {
  const xmlFiles = await findXMLFiles(directoryPath);

  await Promise.all(xmlFiles.map(async (xmlFilePath) => {
    const xml = await fs.promises.readFile(xmlFilePath, 'utf-8');
    const xmlDoc = await xml2js.parseStringPromise(xml);

    const folderName = extractFolderName(xmlFilePath, 'c95181a35f55a9cabf850d6b27cfd4f13c48dfd6');
    if (folderName) {
      xmlDoc.testsuites.testsuite[1].$.name = folderName;
    }

    const updatedXml = new xml2js.Builder().buildObject(xmlDoc);
    await fs.promises.writeFile(xmlFilePath, updatedXml);
  }));
}

function extractFolderName(filePath: string, parentFolder: string): string | undefined {
  const folderNames = filePath.split(path.sep);
  const parentIndex = folderNames.indexOf(parentFolder);
  if (parentIndex !== -1 && parentIndex + 1 < folderNames.length) {
    return folderNames[parentIndex + 1];
  }
  return undefined;
}

async function findXMLFiles(directoryPath: string): Promise<string[]> {
  const entries = await fs.promises.readdir(directoryPath);
  const xmlFiles: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry);
    const stat = await fs.promises.stat(entryPath);

    if (stat.isDirectory()) {
      xmlFiles.push(...await findXMLFiles(entryPath));
    } else if (stat.isFile() && entry.endsWith('.xml')) {
      xmlFiles.push(entryPath);
    }
  }

  return xmlFiles;
}

const buildArtifactsPath = 'build_artifacts';


// ARREGLAR ESTE CODIGO
try {
  fs.readdir(buildArtifactsPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      throw err;
    }

    const dynamicFolder = dirents.find((dirent) => dirent.isDirectory());
    if (dynamicFolder) {
      const dynamicFolderPath = `${buildArtifactsPath}/${dynamicFolder.name}`;
      console.log(dynamicFolderPath); // Output the dynamically changing folder path
    } else {
      console.log('No dynamically changing folder found.');
    }
  });
} catch (err) {
  console.error(err);
}

// Usage example
const baseFolder = 'build_artifacts/c95181a35f55a9cabf850d6b27cfd4f13c48dfd6';
updateTestSuiteNames(baseFolder)
  .then(() => console.log('XML files updated successfully.'))
  .catch((error) => console.error('Error updating XML files:', error));