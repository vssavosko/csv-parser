import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';
import { Parser } from 'json2csv';

import { getParsedData } from './utils/getParsedData';

const fileName = `${process.env.FILE_NAME}.csv`;
const sourceFilePath = path.resolve(__dirname, `../src/source-csv/${fileName}`);
const preparedFilePath = path.resolve(__dirname, `../${fileName}`);
const newDirectoryPath = path.resolve(__dirname, `../src/prepared-csv/${fileName}`);
const csvData: object[] = [];

fs.createReadStream(sourceFilePath)
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error('error', error))
  .on('data', (row) => csvData.push(getParsedData(row)))
  .on('end', async () => {
    try {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(csvData);

      if (fileName) {
        fs.writeFileSync(fileName, csv);

        fs.rename(preparedFilePath, newDirectoryPath, (error) => {
          if (error) throw error;
        });
      } else {
        throw new Error('File does not exist!');
      }
    } catch (error) {
      console.error('error', error);
    }
  });
