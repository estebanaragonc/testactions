import { DOMParser, XMLSerializer } from 'xmldom';
import fs = require('fs');

export default function cleanXMLReport(filePath: string): void {
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
