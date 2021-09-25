import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || '';
const TEMP_FILES_PATH = process.env.TEMP_FILES_PATH || '';
const FINAL_FILES_PATH = process.env.FINAL_FILES_PATH || '';
const TAR_FILE_PATH = process.env.TAR_FILE_PATH || '';
const NODE_ENV = process.env.NODE_ENV || '';

interface IDefaultConfig {
  [key: string]: string;
}

export const defaultConfig: IDefaultConfig = {
  port: PORT,
  nodeEnv: NODE_ENV,
  tempFilesPath: TEMP_FILES_PATH,
  finalFilesPath: FINAL_FILES_PATH,
  tarFilePath: TAR_FILE_PATH,
  login: '',
  password: '',
  url: '',
};
