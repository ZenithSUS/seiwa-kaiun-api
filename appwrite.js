import sdk from "node-appwrite";

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APP_WRITE_PROJECT_ID)
  .setKey(process.env.APP_WRITE_API_KEY);

export const databases = new sdk.Databases(client);

const DATABASE_ID = process.env.APP_WRITE_DATABASE_ID;
const REQUIREMENTS_ID = process.env.COLLECTION_ID_REQUIREMENTS;
const USERS_ID = process.env.COLLECTION_ID_USERS;

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

// CRUD Operations in Requirement
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
