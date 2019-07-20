import dotenv from 'dotenv';
import fs from 'fs';
import defaults from './defaults';

if (fs.existsSync('.env')) {
  dotenv.config();
}

// do not overwrite if the config key is already existing in process.env
Object.keys(defaults).forEach((key) => {
  process.env[key] = (key in process.env) ? process.env[key] : defaults[key];
});

export default process.env;
