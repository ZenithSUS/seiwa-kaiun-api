import {
  addRequirement,
  getRequirements,
  getRequirement,
  updateRequirementById,
  updateDocumentReference,
  updateDocumentRenewal,
  deleteRequirementById,
} from "../appwrite/requirements.js";
import { calculateExpirationDate } from "../utils/expiration-date.js";

// Get all requirements
export const getAllRequirements = async (req, res) => {
  try {
    const department = req.query.dept;

    const requirements = await getRequirements();

    if (department) {
      return res
        .status(200)
        .json(requirements.filter((r) => r.department === department));
    } else {
      return res.status(200).json(requirements);
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Get requirement by id
export const getRequirementById = async (req, res) => {
  try {
    const id = req.params.id;
    const requirement = await getRequirement(id);

    if (!requirement) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Requirement not found",
      });
    } else {
      return res.status(200).json(requirement);
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Create a new requirement
export const createRequirement = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(401).json({
        message: "Unprocessable Entity",
      });
    }

    await addRequirement(req.body);

    return res.status(201).json({
      status: res.statusCode,
      message: "Requirement created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Update a requirement
export const updateRequirement = async (req, res) => {
  try {
    const requirementId = req.params.id;
    await updateRequirementById(req.body, requirementId);

    return res.status(200).json({
      status: res.statusCode,
      message: "Requirement updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const updateRequirementRenewal = async (req, res) => {
  try {
    const requirementId = req.params.id;
    const { renewal, frequency } = req.body;
    const newExpiration = calculateExpirationDate(renewal, frequency);

    if (!renewal || !frequency) {
      return res.status(401).json({
        message: "Renewal or Frequency is required",
      });
    }

    await updateDocumentRenewal(
      {
        expiration: newExpiration,
        dateSubmitted: renewal,
        renewal: renewal,
        status: "Active",
      },
      requirementId
    );

    return res.status(200).json({
      status: res.statusCode,
      message: "Requirement updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const updateRequirementReference = async (req, res) => {
  try {
    const requirementId = req.params.id;

    await updateDocumentReference(req.body, requirementId);

    return res.status(200).json({
      status: res.statusCode,
      message: "Requirement updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Delete a requirement
export const deleteRequirement = async (req, res) => {
  try {
    const requirementId = req.params.id;
    await deleteRequirementById(requirementId);

    return res.status(200).json({
      message: "Requirement Deleted Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
