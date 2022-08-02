import fs from 'fs';
import { parse } from '@fast-csv/parse';

import { getParsedData } from './utils/get-parsed-data';
import { createPreparedFile } from './utils/create-prepared-file';

import { FileDataType } from './utils/get-parsed-data.types';

interface IGetFormattedCSV {
  pathToSourceFiles: string;
  fileName: string;
  userFileData: FileDataType[];
}

export const getFormattedCSV = async ({
  pathToSourceFiles,
  fileName,
  userFileData,
}: IGetFormattedCSV): Promise<{
  fileName: string;
  fileData: string;
}> => {
  const fileData: Record<string, string>[] = [];

  const formatAndSaveData = (sourceFileData: any) => {
    fileData.push(
      getParsedData({
        sourceFileData,
        userFileData,
      })
    );
  };

  return new Promise((resolve, reject) => {
    fs.createReadStream(`${pathToSourceFiles}/${fileName}`)
      .pipe(parse({ headers: true }))
      .on('error', (error) => reject(`Unable to read file: ${error}`))
      .on('data', (sourceFileData) => formatAndSaveData(sourceFileData))
      .on('end', () => {
        try {
          const preparedFileData = createPreparedFile({ fileName, fileData });

          resolve(preparedFileData);
        } catch (error) {
          reject(error);
        }
      });
  });
};
