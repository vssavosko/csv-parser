import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';

import { DirectoryPaths } from 'constants/enums';

export const createPreparedFiles = (fileName: string, fileData: object[]) => {
  const pathToPreparedFilesDirectory = path.join(process.cwd(), DirectoryPaths.prepared);

  try {
    const json2csvParser = new Parser();
    const csvFormattedData = json2csvParser.parse(fileData);

    if (fileName) {
      fs.writeFileSync(`${pathToPreparedFilesDirectory}/${fileName}`, csvFormattedData);

      console.log(`The ${fileName} file has been successfully created!`);
    } else {
      throw new Error('File does not exist!');
    }
  } catch (error) {
    console.error('Unable to write file: ', error);
  }
};
