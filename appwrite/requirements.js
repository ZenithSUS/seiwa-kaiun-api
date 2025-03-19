import { DATABASE_ID, REQUIREMENTS_ID,  databases } from "./index.js";
import sdk, { Query } from "node-appwrite";

export const addRequirement = async (data) => {
  await databases.createDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    sdk.ID.unique(),
    data
  );
};

export const getRequirements = async () => {
  let allDocuments = [];
  let offset = 0;
  const limit = 100; 

  while (true) {
    const documents = await databases.listDocuments(DATABASE_ID, REQUIREMENTS_ID, [
      Query.limit(limit),
      Query.offset(offset)
    ]);

    if (documents.length === 0) break;

    allDocuments = [...allDocuments, ...documents];

    offset += limit;
  }

  return allDocuments;
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

export const updateDocumentReference = async (data, documentId) => {
  const result = await databases.updateDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId, 
    data
  );

  return result;
}

export const updateDocumentRenewal = async (data, documentId) => {
  const result = await databases.updateDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId,
    data
  );
  return result;
}

export const deleteRequirementById = async (documentId) => {
  const result = await databases.deleteDocument(
    DATABASE_ID,
    REQUIREMENTS_ID,
    documentId
  );

  return result;
};