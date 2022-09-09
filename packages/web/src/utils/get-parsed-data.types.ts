export type ValueWithRegExpType = {
  regExp: string;

  captureGroup?: number;
};
type ValueType = string | ValueWithRegExpType;
export type FileDataType = {
  columnName: string;
  newColumnName: string;
  value: ValueType;
};

export interface IGetParsedData {
  sourceFileData: Record<string, string>;
  userFileData: FileDataType[];
}
