const columnNamesToParse = ['Records', 'cookie'];
const columnNamesInPreparedFile = ['', 'Test2'];
const values = ['123', { regExp: new RegExp('email=([^;]*)'), captureGroup: 1 }];

export const userFileData = {
  columnNamesToParse,
  columnNamesInPreparedFile,
  values,
};
