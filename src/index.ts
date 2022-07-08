import fs from 'fs';
import path from 'path';
import { parse } from '@fast-csv/parse';

import { DirectoryPaths } from 'constants/enums';

import { getParsedData } from 'utils/get-parsed-data';
import { createPreparedFiles } from 'utils/create-prepared-files';

const pathToSourceFilesDirectory = path.join(process.cwd(), DirectoryPaths.source);

fs.readdir(pathToSourceFilesDirectory, (error, files) => {
  if (error) {
    return console.error('Unable to scan directory: ', error);
  }

  files.forEach((fileName) => {
    const fileData: object[] = [];

    fs.createReadStream(`${pathToSourceFilesDirectory}/${fileName}`)
      .pipe(parse({ headers: true }))
      .on('error', (error) => console.error('Unable to read file: ', error))
      .on('data', (data) => fileData.push(getParsedData(data)))
      .on('end', () => createPreparedFiles(fileName, fileData));
  });
});
