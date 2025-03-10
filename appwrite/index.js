import sdk from "node-appwrite";

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APP_WRITE_PROJECT_ID)
  .setKey(process.env.APP_WRITE_API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);

export const DATABASE_ID = process.env.APP_WRITE_DATABASE_ID;
export const REQUIREMENTS_ID = process.env.COLLECTION_ID_REQUIREMENTS;
export const USERS_ID = process.env.COLLECTION_ID_USERS;
export const BUCKET_ID = process.env.APP_WRITE_PROJECT_ID;