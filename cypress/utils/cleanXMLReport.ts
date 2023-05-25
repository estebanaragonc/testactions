import { DOMParser, XMLSerializer } from 'xmldom';
import fs = require('fs');
import path = require('path');

const cleanXMLReport = (filePath: string) => {
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

const baseFolder = './build_artifacts';
traverseAndCleanXMLReports(baseFolder);