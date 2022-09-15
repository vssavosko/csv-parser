export interface ICreatePreparedFile {
  fileName: string;
  fileData: Record<string, string>[];
}

export interface ICreatePreparedFileReturnData {
  fileName: string;
  fileData: string;
}
