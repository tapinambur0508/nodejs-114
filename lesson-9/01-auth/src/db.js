import mongoose from 'mongoose';

import { getEnvVariable } from './utils/getEnvVariable.js';

const DB_URI = getEnvVariable('DB_URI');

async function initDatabaseConection() {
  await mongoose.connect(DB_URI);
}

export { initDatabaseConection };
