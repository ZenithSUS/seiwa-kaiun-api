import sdk from "node-appwrite";
const client = new sdk.Client();

export const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);

client
  .setEndpoint(!isProd ? process.env.APP_WRITE_ENDPOINT_KEY_DEV : process.env.APP_WRITE_ENDPOINT_KEY)
  .setProject(!isProd ? process.env.APP_WRITE_PROJECT_ID_DEV : process.env.APP_WRITE_PROJECT_ID)
  .setKey(!isProd ? process.env.APP_WRITE_API_KEY_DEV : process.env.APP_WRITE_API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);

export const DATABASE_ID = !isProd ? process.env.APP_WRITE_DATABASE_ID_DEV : process.env.APP_WRITE_DATABASE_ID;
export const REQUIREMENTS_ID = !isProd ? process.env.COLLECTION_ID_REQUIREMENTS_DEV : process.env.COLLECTION_ID_REQUIREMENTS;
export const USERS_ID = !isProd ? process.env.COLLECTION_ID_USERS_DEV : process.env.COLLECTION_ID_USERS;
export const BUCKET_ID = !isProd ? process.env.APP_WRITE_BUCKET_ID_DEV : process.env.APP_WRITE_BUCKET_ID;