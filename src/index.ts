import fs from 'fs';
import path from 'path';
import { parse } from '@fast-csv/parse';
import { Parser } from 'json2csv';

import { getParsedData } from './utils/getParsedData';

const sourceCsvDirectoryPath = path.join(__dirname, '../src/source-csv');
const preparedCsvDirectoryPath = path.join(__dirname, `../src/prepared-csv`);

const createPreparedCsv = (fileName: string, csvData: object[]) => {
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    if (fileName) {
      fs.writeFileSync(`${preparedCsvDirectoryPath}/${fileName}`, csv);
    } else {
      throw new Error('File does not exist!');
    }
  } catch (error) {
    console.error('Unable to write file: ', error);
  }
};

fs.readdir(sourceCsvDirectoryPath, (error, files) => {
  if (error) {
    return console.error('Unable to scan directory: ', error);
  }

  files.forEach((fileName) => {
    const csvData: object[] = [];

    fs.createReadStream(`${sourceCsvDirectoryPath}/${fileName}`)
      .pipe(parse({ headers: true }))
      .on('error', (error) => console.error('Unable to read file: ', error))
      .on('data', (data) => csvData.push(getParsedData(data)))
      .on('end', () => createPreparedCsv(fileName, csvData));
  });
});
