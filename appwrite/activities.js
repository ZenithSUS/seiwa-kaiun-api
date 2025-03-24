import { DATABASE_ID, ACTIVITIES_ID, databases } from "./index.js";
import sdk, { Query } from "node-appwrite";

export const addActivity = async (data) => {
  await databases.createDocument(
    DATABASE_ID,
    ACTIVITIES_ID,
    sdk.ID.unique(),
    data
  );
};

export const getActivities = async () => {
  let allDocuments = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const { documents } = await databases.listDocuments(
      DATABASE_ID,
      ACTIVITIES_ID,
      [Query.limit(limit), Query.offset(offset)]
    );

    if (documents.length === 0) break;

    allDocuments = [...allDocuments, ...documents];

    offset += limit;
  }

  return allDocuments;
};

export const getActivity = async (documentId) => {
  const result = await databases.getDocument(
    DATABASE_ID,
    ACTIVITIES_ID,
    documentId
  );

  return result;
};
