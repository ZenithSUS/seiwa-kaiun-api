import { DATABASE_ID, USERS_ID, databases } from "./index.js";

export const addUser = async (data) => {
  await databases.createDocument(DATABASE_ID, USERS_ID, sdk.ID.unique(), data);
};

export const getUsers = async () => {
  return await databases.listDocuments(DATABASE_ID, USERS_ID);
};

export const getUser = async (userId) => {
  const result = await databases.getDocument(DATABASE_ID, USERS_ID, userId);
  return result;
};

export const UpdateUserbyID = async (data, userId) => {
  const result = await databases.updateDocument(
    DATABASE_ID,
    USERS_ID,
    userId,
    data
  );
  return result;
};

export const deleteUserByID = async (userId) => {
  const result = await databases.deleteDocument(
    DATABASE_ID,
    USERS_ID,
    userId,
  );
  return result;
};


