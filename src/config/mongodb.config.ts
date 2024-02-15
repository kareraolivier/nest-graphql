import { registerAs } from '@nestjs/config';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
  const { DATABASE_URL } = process.env;

  return {
    uri: `${DATABASE_URL}`,
  };
});
