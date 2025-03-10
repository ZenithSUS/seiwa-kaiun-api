import { DATABASE_ID, REQUIREMENTS_ID, BUCKET_ID, databases, storage } from "./index.js";
import sdk, { InputFile } from "node-appwrite";

export const addRequirement = async (data) => {
  await databases.createDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    sdk.ID.unique(),
    data
  );
};

export const getRequirements = async () => {
  return await databases.listDocuments(DATABASE_ID, REQUIREMENTS_ID);
};

export const getRequirement = async (documentId) => {
  const result = await databases.getDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId
  );

  return result;
};

export const updateRequirementById = async (data, documentId) => {
  const result = await databases.updateDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId,
    data
  );

  return result;
};


export const deleteRequirementById = async (documentId) => {
  const result = await databases.deleteDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId
  );

  return result;
};


export const uploadRequirement = async (file) => {
  const nodeFile = InputFile.fromPath("", file)
  await storage.createFile(BUCKET_ID, sdk.ID.unique(), nodeFile);
}