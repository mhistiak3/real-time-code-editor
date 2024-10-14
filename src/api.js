import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: "18.15.0",
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
