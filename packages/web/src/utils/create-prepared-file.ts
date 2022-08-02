import { Parser } from 'json2csv';

interface ICreatePreparedFile {
  fileName: string;
  fileData: Record<string, string>[];
}

export const createPreparedFile = ({ fileName, fileData }: ICreatePreparedFile) => {
  try {
    const json2csvParser = new Parser();
    const csvFormattedData = json2csvParser.parse(fileData);

    if (fileName && csvFormattedData) {
      return { fileName, fileData: csvFormattedData };
    }

    throw 'File does not exist!';
  } catch (error) {
    throw new Error(`Unable to write file: ${error}`);
  }
};
