import { Parser } from 'json2csv';

import { ICreatePreparedFile, ICreatePreparedFileReturnData } from './create-prepared-file.types';

export const createPreparedFile = ({
  fileName,
  fileData,
}: ICreatePreparedFile): ICreatePreparedFileReturnData | never => {
  try {
    const json2csvParser = new Parser();
    const csvFormattedData = json2csvParser.parse(fileData);

    if (fileName && csvFormattedData) {
      return { fileName, fileData: csvFormattedData };
    }

    throw 'File does not exist!';
  } catch (error) {
    throw `Unable to write file: ${error}`;
  }
};
