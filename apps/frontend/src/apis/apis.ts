import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants/languages";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

//https://piston.readthedocs.io/en/latest/api-v2/#packages
  //the code will come from the code editor setValue -> se code mei anna chaiye
export const runCode = async (code, language, stdin = "") => {
  try {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
      stdin: stdin,
    });
    return response.data;
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
};
//!THIS IS NOT SUPPOSE TO BE HERE 
function getFinalCode(userCode, language) {
  const inputLogic = BOILERPLATE[language]?.input || "";
  const outputLogic = BOILERPLATE[language]?.output || "";
  // Insert user code between input and output logic
  // You can also replace a placeholder in outputLogic if needed
  return `${inputLogic}\n${userCode}\n${outputLogic}`;
}
//!IMPLEMENT THIS Where ever U WANT
