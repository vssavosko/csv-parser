import fs from 'fs';
import path from 'path';
import { parse } from '@fast-csv/parse';

import { userFileData } from 'configs/user-file-data';

import { DirectoryPaths } from 'constants/enums';

import { getParsedData } from 'utils/get-parsed-data';
import { createPreparedFiles } from 'utils/create-prepared-files';

const pathToSourceFilesDirectory = path.join(process.cwd(), DirectoryPaths.source);

fs.readdir(pathToSourceFilesDirectory, (error, files) => {
  if (error) {
    return console.error('Unable to scan directory: ', error);
  }

  files.forEach((fileName) => {
    const fileData: Record<string, string>[] = [];

    fs.createReadStream(`${pathToSourceFilesDirectory}/${fileName}`)
      .pipe(parse({ headers: true }))
      .on('error', (error) => console.error('Unable to read file: ', error))
      .on('data', (sourceFileData) =>
        fileData.push(
          getParsedData({
            sourceFileData,
            userFileData,
          })
        )
      )
      .on('end', () => createPreparedFiles({ fileName, fileData }));
  });
});
