import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import { parse } from '@fast-csv/parse';
import { Parser } from 'json2csv';

import { getParsedData } from './utils/getParsedData';

const fileName = `${process.env.FILE_NAME}.csv`;
const sourceFilePath = path.resolve(__dirname, `../src/source-csv/${fileName}`);
const preparedFilePath = path.resolve(__dirname, `../src/prepared-csv/${fileName}`);
const csvData: object[] = [];

const createPreparedCsv = () => {
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);

    if (fileName) {
      fs.writeFileSync(preparedFilePath, csv);
    } else {
      throw new Error('File does not exist!');
    }
  } catch (error) {
    console.error('error', error);
  }
};

fs.createReadStream(sourceFilePath)
  .pipe(parse({ headers: true }))
  .on('error', (error) => console.error('error', error))
  .on('data', (row) => csvData.push(getParsedData(row)))
  .on('end', createPreparedCsv);
