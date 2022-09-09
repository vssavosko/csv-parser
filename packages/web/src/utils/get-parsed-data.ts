import { ValueWithRegExpType, IGetParsedData } from './get-parsed-data.types';

export const getParsedData = ({ sourceFileData, userFileData }: IGetParsedData) => {
  const result: Record<string, string> = {};

  userFileData.forEach(({ columnName, newColumnName, value }) => {
    const sourceFileColumnData = sourceFileData[columnName];

    if (!sourceFileColumnData || !value) return;

    const columnNameInPreparedFile = newColumnName || columnName;

    if (value instanceof Object) {
      const { regExp, captureGroup } = value as ValueWithRegExpType;

      return (result[columnNameInPreparedFile] = decodeURIComponent(
        sourceFileColumnData.match(new RegExp(regExp))?.[captureGroup || 0] || ''
      ));
    }

    result[columnNameInPreparedFile] = decodeURIComponent(
      sourceFileColumnData.match(value as string)?.[0] || ''
    );
  });

  return result;
};
