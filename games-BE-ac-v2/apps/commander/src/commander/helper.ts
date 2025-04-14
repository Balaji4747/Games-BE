import * as XLSX from 'xlsx';

export const getRangeData = (worksheet: XLSX.WorkSheet, range: string, isObject = false, isFlatMap = true): any => {
  let data: any = XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
    range,
    defval: null,
    header: 1,
  });

  if (isObject) {
    const d = {};
    data.forEach((num) => {
      d[num[0]] = num[1];
    });
    data = d;
  } else if (isFlatMap) {
    data = data.flatMap((num) => {
      return num;
    });
  }
  return data;
};
