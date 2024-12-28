import DataURIParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataURIParser();
  if (file.originalName) {
    const extName = path.extname(file.originalName).toString();
    return parser.format(extName, file.buffer);
  }
};

export default getDataUri;
