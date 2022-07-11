type ValueWithRegExpType = {
  regExp: RegExp;

  captureGroup?: number;
};

type ValuesType = string | ValueWithRegExpType;

interface IGetParsedData {
  sourceFileData: Record<string, string>;
  userFileData: {
    columnNamesToParse: string[];
    columnNamesInPreparedFile: string[];
    values: ValuesType[];
  };
}

export const getParsedData = ({
  sourceFileData,
  userFileData: { columnNamesToParse, columnNamesInPreparedFile, values },
}: IGetParsedData) => {
  const result: Record<string, string> = {};

  columnNamesToParse.forEach((columnName, index) => {
    const sourceFileColumnData = sourceFileData[columnName];
    const currentValue = values[index];

    if (!sourceFileColumnData || !currentValue) return;

    const columnNameInPreparedFile = columnNamesInPreparedFile[index] || columnName;

    if (currentValue instanceof Object) {
      const { regExp, captureGroup } = currentValue as ValueWithRegExpType;

      return (result[columnNameInPreparedFile] = decodeURIComponent(
        sourceFileColumnData.match(regExp)?.[captureGroup || 0] || ''
      ));
    }

    result[columnNameInPreparedFile] = decodeURIComponent(
      sourceFileColumnData.match(currentValue as string)?.[0] || ''
    );
  });

  return result;
};
