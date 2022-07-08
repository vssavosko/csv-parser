import fs from 'fs';
import path from 'path';
import { parse } from '@fast-csv/parse';

import { getParsedData } from './utils/getParsedData';
import { createPreparedCsv } from './utils/createPreparedCsv';

const sourceCsvDirectoryPath = path.join(process.cwd(), 'src/source-csv');

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
