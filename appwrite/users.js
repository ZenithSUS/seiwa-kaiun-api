import { DATABASE_ID, USERS_ID, databases, users } from "./index.js";
import sdk from "node-appwrite";

export const addUser = async (data) => {
  const { password, name, ...values } = data;
  const res = await users.create(sdk.ID.unique(), values.email, undefined, password, name);
  await users.updateLabels(res.$id, ['user', values.department]); 
  return await databases.createDocument(DATABASE_ID, USERS_ID, res.$id, values);
};

export const getUsers = async () => {
  return await databases.listDocuments(DATABASE_ID, USERS_ID);
};

export const getUser = async (userId) => {
  const result = await databases.getDocument(DATABASE_ID, USERS_ID, userId);
  return result;
};

export const updateUser = async (data, userId) => {
  const result = await databases.updateDocument(
    DATABASE_ID,
    USERS_ID,
    userId,
    data
  );
  return result;
};

export const deleteUserByID = async (userId) => {
  const result = await databases.deleteDocument(DATABASE_ID, USERS_ID, userId);
  return result;
};
