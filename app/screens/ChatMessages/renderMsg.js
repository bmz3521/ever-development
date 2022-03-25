export const renderIcon = extension => {
  return ICON_EXTENSIONS[extension] ?? require('./icons/zip.png');
};

const ICON_EXTENSIONS = {
  pdf: require('./icons/pdf.png'),
  csv: require('./icons/excel.png'),
  xlsx: require('./icons/excel.png'),
  xls: require('./icons/excel.png'),
  docx: require('./icons/doc.png'),
  doc: require('./icons/doc.png'),
  ppt: require('./icons/ppt.png'),
  pptx: require('./icons/ppt.png'),
};
