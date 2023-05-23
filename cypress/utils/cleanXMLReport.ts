import { DOMParser, XMLSerializer } from 'xmldom';
import * as fs from 'fs';

export function cleanXMLReport(filePath: string): void {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

  const testcaseElements = Array.from(xmlDoc.getElementsByTagName('testcase'));
  console.log('elvis');
  for (const testcase of testcaseElements) {
    const nameAttr = testcase.getAttribute('name');
    const classnameAttr = testcase.getAttribute('classname');

    if (nameAttr && classnameAttr) {
      const newText = nameAttr.match(/\[(.*?)\]/)?.[1] || '';
      testcase.setAttribute('name', newText);
      testcase.setAttribute('classname', newText);
    }
  }

  const serializer = new XMLSerializer();
  const modifiedXML = serializer.serializeToString(xmlDoc);
  fs.writeFileSync(filePath, modifiedXML, 'utf-8');
}
