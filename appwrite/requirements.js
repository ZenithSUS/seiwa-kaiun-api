import { DATABASE_ID, REQUIREMENTS_ID, databases } from "./index.js";

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
  
  