import { DOMParser, XMLSerializer } from 'xmldom';
import * as fs from 'fs';
import * as path from 'path';

// Function to clean a single XML report file
const cleanXMLReport = (filePath: string) => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const testcaseElements = Array.from(xmlDoc.getElementsByTagName('testcase'));
  // Iterate over each testcase element and modify the 'name' and 'classname' attributes
  testcaseElements.forEach((testcase) => {
    const nameAttr = (testcase as Element).getAttribute('name');
    const classnameAttr = (testcase as Element).getAttribute('classname');
    if (nameAttr && classnameAttr) {
      const newText = nameAttr.match(/\[(.*?)\]/)?.[1] || '';
      (testcase as Element).setAttribute('name', newText);
      (testcase as Element).setAttribute('classname', newText);
    }
  });
  const serializer = new XMLSerializer();
  const modifiedXML = serializer.serializeToString(xmlDoc);
  // Write the modified XML back to the file
  fs.writeFileSync(filePath, modifiedXML, 'utf-8');
};

// Function to recursively traverse the directory and clean all XML report files
function traverseAndCleanXMLReports(folderPath: string): void {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      traverseAndCleanXMLReports(filePath);
    } else if (path.extname(filePath) === '.xml') {
      cleanXMLReport(filePath);
    }
  });
}
// Traverse and clean all XML report files
const baseFolder = './build_artifacts';
if (fs.existsSync(baseFolder)) {
  traverseAndCleanXMLReports(baseFolder);
} else {
  // eslint-disable-next-line no-console
  console.error(`Browserstack report directory not found: ${baseFolder}`);
}
