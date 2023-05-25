import { DOMParser, XMLSerializer } from 'xmldom';
import fs = require('fs');
import path = require('path');

export const cleanXMLReport = (filePath: string) => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
  const testcaseElements = Array.from(xmlDoc.getElementsByTagName('testcase'));
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
  fs.writeFileSync(filePath, modifiedXML, 'utf-8');
}

export const traverseAndCleanXMLReports = (folderPath: string): void => {
  const entries = fs.readdirSync(folderPath);
  entries.forEach((entry) => {
    const entryPath = path.join(folderPath, entry);
    const stat = fs.statSync(entryPath);
    if (stat.isDirectory()) {
      traverseAndCleanXMLReports(entryPath);
    } else if (stat.isFile() && path.extname(entry) === '.xml') {
      cleanXMLReport(entryPath);
    }
  });
};