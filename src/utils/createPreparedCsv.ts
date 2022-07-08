import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';

const preparedCsvDirectoryPath = path.join(process.cwd(), `src/prepared-csv`);

export const createPreparedCsv = (fileName: string, csvData: object[]) => {
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
