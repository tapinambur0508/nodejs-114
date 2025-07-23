import 'dotenv/config';

import app from './app.js';
import { initDatabaseConection } from './db.js';

import { getEnvVariable } from './utils/getEnvVariable.js';

const PORT = getEnvVariable('PORT') || 8080;

async function bootstrap() {
  await initDatabaseConection();

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap().catch((error) => console.error(error));
