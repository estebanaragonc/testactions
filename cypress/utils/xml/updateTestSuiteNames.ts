import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';

async function updateTestSuiteNames(directoryPath: string, buildFolderName: string): Promise<void> {
  const xmlFiles = await findXMLFiles(directoryPath);

  await Promise.all(xmlFiles.map(async (xmlFilePath) => {
    const xml = await fs.promises.readFile(xmlFilePath, 'utf-8');
    const xmlDoc = await xml2js.parseStringPromise(xml);

    const folderName = extractFolderName(xmlFilePath, buildFolderName);
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

try {
  fs.readdir(buildArtifactsPath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      throw err;
    }
    const dynamicFolder = dirents.find((dirent) => dirent.isDirectory());
    if (dynamicFolder) {
      const dynamicFolderPath = `${buildArtifactsPath}/${dynamicFolder.name}`;
      updateTestSuiteNames(dynamicFolderPath, dynamicFolder.name)
        .then(() => console.log('XML files updated successfully.'))
        .catch((error) => console.error('Error updating XML files:', error));
    } else {
      console.log('There was an issue with utils/updateTestSuiteNames. \
      It seems that the folder build_artifacts created by browserstack does not have a buildId folder example \
      build_artifacts/kj213h23n2k22l2h2g44g2k1l1oh2 \
      Please make sure the browserstack integration worked as expected and generated the folder build_artifacts/abcdefg12345whateveridhere');
    }
  });
} catch (err) {
  console.error(err);
}
